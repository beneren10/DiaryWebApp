DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    title VARCHAR(50) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    time TIME DEFAULT CURRENT_TIME
);


INSERT INTO diary (category, text, title, date) 
VALUES 
    ('Personal', 'Today was a good day! Went for a walk and enjoyed nature.', 'A Fresh Start', '2024-01-30'),
    ('Work', 'Had a long meeting about the upcoming project. Lots to do!', 'Project Planning', '2024-01-30'),
    ('Travel', 'Visited a beautiful beach today. The sunset was amazing.', 'Beach Adventure', '2024-03-30'),
    ('Fitness', 'Completed my first 5K run! Feeling great.', 'Running Success', '2024-01-30'),
    ('Food', 'Tried making homemade sushi today. It turned out delicious!', 'Sushi Experiment', '2024-06-30');