CREATE DATABASE OdaFrame;
Use OdaFrame;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR (45),
	email VARCHAR (45),
	cpf CHAR (14),
	senha VARCHAR (45)
);

CREATE TABLE upload (
	idUpload INT PRIMARY KEY AUTO_INCREMENT,
	tipoFoto VARCHAR(30),
    CONSTRAINT chk_tipoFoto
        CHECK (tipoFoto IN ('Amigos','Família','Viagens', 'Momentos', 'Esporte', 'Animais')),
	dtFoto DATE,
	sentimento VARCHAR(30),
    CONSTRAINT chk_sentimento 
        CHECK (sentimento IN ('Feliz','Animado','Tranquilo', 'Triste', 'Surpreso', 'Chateado'))
);

ALTER TABLE upload ADD COLUMN caminhoFoto VARCHAR(300);

ALTER TABLE upload ADD COLUMN fkUsuario INT;
ALTER TABLE upload ADD CONSTRAINT fk_usuario_upload 
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario);

ALTER TABLE usuario
  MODIFY COLUMN nome VARCHAR(45) NOT NULL,
  MODIFY COLUMN email VARCHAR(45) NOT NULL,
  MODIFY COLUMN cpf CHAR(14) NOT NULL UNIQUE,
  MODIFY COLUMN senha VARCHAR(45) NOT NULL;

ALTER TABLE upload
  MODIFY COLUMN tipoFoto VARCHAR(30) NOT NULL,
  MODIFY COLUMN dtFoto DATE NOT NULL,
  MODIFY COLUMN sentimento VARCHAR(30) NOT NULL,
  MODIFY COLUMN caminhoFoto VARCHAR(300) NOT NULL,
  MODIFY COLUMN fkUsuario INT NOT NULL;


ALTER TABLE upload DROP CONSTRAINT chk_sentimento;
ALTER TABLE upload ADD CONSTRAINT chk_sentimento 
    CHECK (sentimento IN ('Feliz', 'Triste', 'Surpreso', 'Saudade', 'Divertindo'));