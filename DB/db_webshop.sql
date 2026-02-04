-- 1. Erabiltzaileen taula
CREATE TABLE erabiltzaileak (
    erabiltzaile_id INT AUTO_INCREMENT PRIMARY KEY,
    helbide_elektronikoa VARCHAR(100) UNIQUE NOT NULL,
    pasahitza VARCHAR(255) NOT NULL,
    izena VARCHAR(50),
    abizenak VARCHAR(100),
    tfnoa VARCHAR(15),
    sormen_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Produktuen katalogoa (Kategoriak eta Produktuak)
CREATE TABLE kategoriak (
    kategoria_id INT AUTO_INCREMENT PRIMARY KEY,
    izena VARCHAR(50) NOT NULL
);

CREATE TABLE produktuak (
    produktu_id INT AUTO_INCREMENT PRIMARY KEY,
    izena VARCHAR(100) NOT NULL,
    deskribapena TEXT,
    prezioa DECIMAL(10, 2) NOT NULL,
    irudi_urla VARCHAR(255),
    kategoria_id INT,
    FOREIGN KEY (kategoria_id) REFERENCES kategoriak(kategoria_id)
);

-- 3. Saskia (Karritoa)
CREATE TABLE saski_elementuak (
    erabiltzaile_id INT,
    produktu_id INT,
    kantitatea INT NOT NULL,
    PRIMARY KEY (erabiltzaile_id, produktu_id),
    FOREIGN KEY (erabiltzaile_id) REFERENCES erabiltzaileak(erabiltzaile_id),
    FOREIGN KEY (produktu_id) REFERENCES produktuak(produktu_id)
);

-- 4. Eskaerak (Goiburua eta Xehetasunak)
CREATE TABLE eskaerak (
    eskaera_id INT AUTO_INCREMENT PRIMARY KEY,
    erabiltzaile_id INT,
    sormen_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    egoera VARCHAR(20) DEFAULT 'prozesuan',
    FOREIGN KEY (erabiltzaile_id) REFERENCES erabiltzaileak(erabiltzaile_id)
);

CREATE TABLE eskaera_elementuak (
    eskaera_id INT,
    produktu_id INT,
    kantitatea INT NOT NULL,
    prezioa DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (eskaera_id, produktu_id),
    FOREIGN KEY (eskaera_id) REFERENCES eskaerak(eskaera_id),
    FOREIGN KEY (produktu_id) REFERENCES produktuak(produktu_id)
);