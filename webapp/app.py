from flask import Flask, request, jsonify, send_from_directory
import subprocess, os, json, uuid

app = Flask(__name__, static_folder='static')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)          # DR_Screening/  (webapp/ is inside it)
SRC_DIR = os.path.join(PROJECT_ROOT, 'src')
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)

# If `matlab` isn't on your system PATH, replace this with the full path,
# e.g. '/Applications/MATLAB_R2024b.app/bin/matlab'
MATLAB_EXE = '/Applications/MATLAB_R2026a.app/bin/matlab'


@app.route('/')
def home():
    return send_from_directory('static', 'index.html')


@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']
    job_id = str(uuid.uuid4())
    job_dir = os.path.join(UPLOAD_DIR, job_id)
    os.makedirs(job_dir, exist_ok=True)

    image_path = os.path.join(job_dir, file.filename)
    file.save(image_path)

    subfolders = ['quality', 'segmentation', 'classification', 'explainability']
    add_paths = "; ".join(
        f"addpath('{os.path.join(SRC_DIR, s)}')" for s in subfolders
    )
    matlab_expr = (
        f"cd('{PROJECT_ROOT}'); {add_paths}; addpath('{PROJECT_ROOT}'); "
        f"runPipelineForWeb('{image_path}', '{job_dir}')"
    )
    cmd = [MATLAB_EXE, '-batch', matlab_expr]

    try:
        proc = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    except subprocess.TimeoutExpired:
        return jsonify({'error': 'MATLAB timed out'}), 500
    except FileNotFoundError:
        return jsonify({'error': f"'{MATLAB_EXE}' not found — is MATLAB desktop installed and on PATH?"}), 500

    if proc.returncode != 0:
        return jsonify({
            'error': 'MATLAB processing failed',
            'details': proc.stderr.strip() or proc.stdout.strip()
        }), 500

    result_path = os.path.join(job_dir, 'result.json')
    if not os.path.exists(result_path):
        return jsonify({'error': 'No result.json produced — check MATLAB output for errors'}), 500

    with open(result_path) as f:
        result = json.load(f)

    for fname, key in [('gradcam.png', 'gradcam_url'), ('enhanced.png', 'enhanced_url')]:
        if os.path.exists(os.path.join(job_dir, fname)):
            result[key] = f'/uploads/{job_id}/{fname}'

    return jsonify(result)


@app.route('/uploads/<job_id>/<filename>')
def serve_upload(job_id, filename):
    return send_from_directory(os.path.join(UPLOAD_DIR, job_id), filename)


if __name__ == '__main__':
    app.run(debug=True, port=5000)