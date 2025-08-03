DROP TABLE IF EXISTS diary;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    email VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE diary (
    id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    text TEXT NOT NULL,
    title VARCHAR(50) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    rating INT NOT NULL DEFAULT 5,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE 
);

-- INSERT INTO diary (user_id, category, text, title, date) 
-- VALUES 
-- (1, 'Personal', 'Today was a good day! Went for a walk and enjoyed nature.', 'A Fresh Start', TO_DATE('30-12-23', 'DD-MM-YY')),
-- (1, 'Work', 'Had a long meeting about the upcoming project. Lots to do!', 'Project Planning', TO_DATE('30-01-24', 'DD-MM-YY')),
-- (1, 'Travel', 'Visited a beautiful beach today. The sunset was amazing.', 'Beach Adventure', TO_DATE('30-03-24', 'DD-MM-YY')),
-- (1, 'Fitness', 'Completed my first 5K run! Feeling great.', 'Running Success', TO_DATE('30-01-24', 'DD-MM-YY')),
-- (1, 'Food', 'Tried making homemade sushi today. It turned out delicious!', 'Sushi Experiment', TO_DATE('30-06-24', 'DD-MM-YY'));
