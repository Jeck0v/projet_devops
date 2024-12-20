CREATE TABLE IF NOT EXISTS shopping_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL
);

INSERT INTO shopping_items (name, quantity) VALUES 
('Apples', 3),
('Bananas', 5),
('Mangoes', 7)
ON CONFLICT DO NOTHING;


