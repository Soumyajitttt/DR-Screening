export default function AnalysisTab({ analysis, onImageSelected, onRunDiagnostics }) {
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) onImageSelected(file);
  }

  const quality = analysis?.quality;

  return (
    <div>
      <h3>Field Image Upload &amp; Calibration</h3>

      <div>
        <h4>Upload Fundus Image Scan</h4>
        <p>Supports portable smartphone &amp; handheld cameras</p>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <div>
        <h4>Quality Control &amp; Validation</h4>
        <p>Automated field quality check for non-mydriatic images</p>

        {quality ? (
          <ul>
            <li>Field Quality Score: {quality.fieldQualityScore}%</li>
            <li>Illumination &amp; Contrast: {quality.illumination}</li>
            <li>Macular Centering: {quality.macularCentering}</li>
          </ul>
        ) : (
          <p>No image analyzed yet.</p>
        )}

        <button onClick={onRunDiagnostics}>Run AI Diagnostics</button>
      </div>
    </div>
  );
}
