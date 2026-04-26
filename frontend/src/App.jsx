import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('text');

  const handleTextSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/process-text', { text });
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Error al procesar el texto');
    } finally {
      setLoading(false);
    }
  };

  const handleFileSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/process-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Error al procesar el PDF');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🤖 Agente de Onboarding Inteligente</h1>
        <p className="subtitle">Powered by AI — Interinnova Demo</p>
      </header>

      <div className="tabs">
        <button
          onClick={() => setActiveTab('text')}
          className={activeTab === 'text' ? 'active' : ''}
        >
          📝 Pegar Texto
        </button>
        <button
          onClick={() => setActiveTab('pdf')}
          className={activeTab === 'pdf' ? 'active' : ''}
        >
          📄 Subir PDF
        </button>
      </div>

      <div className="input-section">
        {activeTab === 'text' && (
          <>
            <textarea
              rows="10"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button onClick={handleTextSubmit}>Procesar Documento</button>
          </>
        )}
        {activeTab === 'pdf' && (
          <>
            <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleFileSubmit}>Procesar PDF</button>
          </>
        )}
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          Analizando documento...
        </div>
      )}

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="result-card">
          <header>
            <span className={`badge ${result.estado.toLowerCase()}`}>{result.estado}</span>
          </header>
          <div className="score-bar" style={{ width: `${result.score}%` }}></div>
          <div className="data-grid">
            <h2>Datos del Cliente</h2>
            <ul>
              {Object.entries(result.datos_cliente).map(([key, value]) => (
                <li key={key}>
                  <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
          <div className="service">
            <h2>Servicio Requerido</h2>
            <p>{result.servicio_requerido}</p>
          </div>
          <div className="documentacion">
            <h2>Documentación Presente</h2>
            <ul>
              {(result.documentacion?.presente || []).map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
            <h2>Documentación Faltante</h2>
            <ul>
              {(result.documentacion?.faltante || []).map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>
          {result.alertas.length > 0 && (
            <div className="alertas">
              <h2>Alertas</h2>
              <ul>
                {(result.alertas || []).map((alerta, index) => (
                  <li key={index}>{alerta}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
