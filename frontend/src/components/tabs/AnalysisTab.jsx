export default function AnalysisTab({ analysis, onImageSelected, onRunDiagnostics }) {
  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) onImageSelected(file);
  }

  const quality = analysis?.quality;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Field Image Upload &amp; Calibration</h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <h4 className="mb-1 font-semibold text-slate-700">Upload Fundus Image Scan</h4>
          <p className="mb-4 text-sm text-slate-500">Supports portable smartphone &amp; handheld cameras</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mx-auto block text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-sky-600 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-sky-700"
          />
        </div>

        <div>
          <h4 className="mb-1 font-semibold text-slate-700">Quality Control &amp; Validation</h4>
          <p className="mb-3 text-sm text-slate-500">Automated field quality check for non-mydriatic images</p>

          {quality ? (
            <ul className="space-y-2 rounded-md bg-slate-100 p-4 text-sm text-slate-700">
              <li className="flex justify-between">
                <span>Field Quality Score</span>
                <strong className="text-emerald-600">{quality.fieldQualityScore}%</strong>
              </li>
              <li className="flex justify-between">
                <span>Illumination &amp; Contrast</span>
                <strong className="text-emerald-600">{quality.illumination}</strong>
              </li>
              <li className="flex justify-between">
                <span>Macular Centering</span>
                <strong className="text-emerald-600">{quality.macularCentering}</strong>
              </li>
            </ul>
          ) : (
            <p className="text-sm text-slate-400">No image analyzed yet.</p>
          )}

          <button
            onClick={onRunDiagnostics}
            className="mt-5 w-full rounded-md bg-teal-600 py-2 text-sm font-semibold text-white hover:bg-teal-700"
          >
            Run AI Diagnostics &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
