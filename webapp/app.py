from flask import Flask, request, jsonify, send_from_directory
import subprocess, os, json, uuid

app = Flask(__name__, static_folder='static')
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)
SRC_DIR = os.path.join(PROJECT_ROOT, 'src')
UPLOAD_DIR = os.path.join(BASE_DIR, 'uploads')
os.makedirs(UPLOAD_DIR, exist_ok=True)
MATLAB_EXE = '/Applications/MATLAB_R2026a.app/bin/matlab'   # 'which matlab' se path na mile to yahan full path daalo

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

    add_paths = "; ".join(
        f"addpath('{os.path.join(SRC_DIR, s)}')" for s in ['quality', 'segmentation', 'classification', 'explainability']
    )
    matlab_expr = f"{add_paths}; addpath('{PROJECT_ROOT}'); runPipelineForWeb('{image_path}', '{job_dir}')"
    cmd = [MATLAB_EXE, '-batch', matlab_expr]

    try:
        subprocess.run(cmd, check=True, timeout=180)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    result_path = os.path.join(job_dir, 'result.json')
    if not os.path.exists(result_path):
        return jsonify({'error': 'No result.json produced'}), 500
    with open(result_path) as f:
        result = json.load(f)
    if os.path.exists(os.path.join(job_dir, 'enhanced.png')):
        result['enhanced_url'] = f'/uploads/{job_id}/enhanced.png'
    return jsonify(result)

@app.route('/uploads/<job_id>/<filename>')
def serve_upload(job_id, filename):
    return send_from_directory(os.path.join(UPLOAD_DIR, job_id), filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)