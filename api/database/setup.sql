DROP TABLE IF EXISTS diary;

CREATE TABLE diary (
    id INT GENERATED ALWAYS AS IDENTITY,
    category VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    title VARCHAR(50) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY(id)
);


INSERT INTO diary (category, text, title, date) 
VALUES 
('Personal', 'Today was a good day! Went for a walk and enjoyed nature.', 'A Fresh Start', TO_DATE('30-12-23', 'DD-MM-YY')),
('Work', 'Had a long meeting about the upcoming project. Lots to do!', 'Project Planning', TO_DATE('30-01-24', 'DD-MM-YY')),
('Travel', 'Visited a beautiful beach today. The sunset was amazing.', 'Beach Adventure', TO_DATE('30-03-24', 'DD-MM-YY')),
('Fitness', 'Completed my first 5K run! Feeling great.', 'Running Success', TO_DATE('30-01-24', 'DD-MM-YY')),
('Food', 'Tried making homemade sushi today. It turned out delicious!', 'Sushi Experiment', TO_DATE('30-06-24', 'DD-MM-YY'));
