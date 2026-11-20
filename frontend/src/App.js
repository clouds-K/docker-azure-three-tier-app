import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [health, setHealth] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
 const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Docker


  useEffect(() => {
    fetchHealth();
    fetchTasks();
  }, []);


  const fetchHealth = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/health`);
      setHealth(response.data.status);
    } catch (err) {
      console.error('Erreur health check:', err);
      setHealth('Backend non disponible');
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
    } catch (err) {
      console.error('Erreur de récupération des tâches:', err);
      setError('Impossible de charger les tâches');
    } finally {
      setLoading(false);
    }
  };


  const addTask = async () => {
    if (!newTask.trim()) {
      alert('Veuillez entrer une tâche');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/tasks`, {
        title: newTask
      });
      setNewTask('');
      fetchTasks(); 
    } catch (err) {
      console.error('Erreur lors de l\'ajout:', err);
      alert('Erreur lors de l\'ajout de la tâche');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      fetchTasks(); 
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      alert('Erreur lors de la suppression');
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await axios.put(`${API_URL}/api/tasks/${id}`, {
        completed: !completed
      });
      fetchTasks(); 
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Application Multi-Tiers avec Docker et Azure</h1>
        <div className="status-badge">
          <span className={health.includes('running') ? 'status-ok' : 'status-error'}>
            ● {health || 'Vérification...'}
          </span>
        </div>
      </header>

      <main className="App-main">
        <div className="task-container">
          <h2>📝 Liste des Tâches</h2>
          
          {/* Formulaire d'ajout */}
          <div className="task-input-group">
            <input 
              type="text"
              className="task-input"
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Entrez une nouvelle tâche..."
            />
            <button className="btn-add" onClick={addTask}>
              ➕ Ajouter
            </button>
          </div>

          {/* Messages d'erreur ou de chargement */}
          {loading && <p className="loading">⏳ Chargement...</p>}
          {error && <p className="error">❌ {error}</p>}

          {/* Liste des tâches */}
          <ul className="task-list">
            {tasks.length === 0 && !loading && (
              <li className="no-tasks">Aucune tâche. Commencez par en ajouter une ! 🎉</li>
            )}
            
            {tasks.map(task => (
              <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input 
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id, task.completed)}
                  />
                  <span className="task-title">{task.title}</span>
                </div>
                <button 
                  className="btn-delete" 
                  onClick={() => deleteTask(task.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          {/* Statistiques */}
          {tasks.length > 0 && (
            <div className="task-stats">
              <p>
                Total: <strong>{tasks.length}</strong> tâches | 
                Complétées: <strong>{tasks.filter(t => t.completed).length}</strong> | 
                En cours: <strong>{tasks.filter(t => !t.completed).length}</strong>
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Projet TP - Cloud Computing et Virtualisation</p>
        <p>Frontend: React | Backend: Node.js | Database: PostgreSQL | Cloud: Azure</p>
      </footer>
    </div>
  );
}

export default App;
