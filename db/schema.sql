DROP TABLE IF EXISTS wave_break CASCADE;
DROP TABLE IF EXISTS surfers CASCADE;

CREATE TABLE surfers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  skill_level INTEGER NOT NULL,
  board_type VARCHAR(50) NOT NULL,
  favorite_break_id INTEGER,
  FOREIGN KEY (favorite_break_id) REFERENCES wave_break(id)
);



CREATE TABLE wave_break (
  id SERIAL PRIMARY KEY,
  break_location VARCHAR(50),
  difficult_level INTEGER,
  rough_reef VARCHAR(250)
);
