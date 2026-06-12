
CREATE TABLE daily_plans(
 id SERIAL PRIMARY KEY,
 date DATE UNIQUE,
 mip TEXT,
 energy VARCHAR(20),
 score INT
);
