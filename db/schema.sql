DROP TABLE IF EXISTS wave_break CASCADE;
DROP TABLE IF EXISTS surfers CASCADE;


CREATE TABLE wave_break (
  id SERIAL PRIMARY KEY,
  break_location VARCHAR(50),
  difficult_level INTEGER,
  rough_reef BOOLEAN,
  image VARCHAR(250)
);



CREATE TABLE surfers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  skill_level INTEGER,
  board_type VARCHAR(50),
  favorite_break_id INTEGER REFERENCES wave_break(id),
  email VARCHAR(50),
  password VARCHAR(255)
);




