
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tasks (title, completed) VALUES 
    ('Configurer Docker Desktop', true),
    ('Créer les Dockerfiles', true),
    ('Tester localement avec docker-compose', false),
    ('Créer un compte Azure', false),
    ('Déployer sur Azure Container Registry', false),
    ('Configurer Azure Container Instances', false),
    ('Tester l''application en production', false),
    ('Rédiger le rapport TP', false),
    ('Préparer la présentation PowerPoint', false),
    ('Faire la démonstration au professeur', false);

CREATE INDEX idx_tasks_created_at ON tasks(created_at DESC);