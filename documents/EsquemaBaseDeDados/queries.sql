USE sql4405171;

INSERT INTO Genero (id_genero, sexo) VALUES ('1', 'Masculino');
INSERT INTO Genero (id_genero, sexo) VALUES ('2', 'Femenino');
INSERT INTO Genero (id_genero, sexo) VALUES ('3', 'Outro');

-- Adicionar roles dos Alumnis
INSERT INTO Role_Tutor_Embaixador (id_role, descricao) VALUES ('1', 'Embaixador');
INSERT INTO Role_Tutor_Embaixador (id_role, descricao) VALUES ('2', 'Tutor');
INSERT INTO Role_Tutor_Embaixador (id_role, descricao) VALUES ('3', 'Alumni Normal');

-- Adicionar Nacionalidades
INSERT INTO Nacionalidade (id_nacionalidade, paises, nacionalidade) VALUES ('1', 'Portugal', 'português');
INSERT INTO Nacionalidade (id_nacionalidade, paises, nacionalidade) VALUES ('2', 'Venezuela', 'venezuelano');
INSERT INTO Nacionalidade (id_nacionalidade, paises, nacionalidade) VALUES ('3', 'Espanha', 'espanhol');

-- Adicionar Codigo Postal
INSERT INTO CodigoPostal (id_codigoPostal, localidade) VALUES ('4770-440', 'Vila Nova de Famalicão');
INSERT INTO CodigoPostal (id_codigoPostal, localidade) VALUES ('4715-303', 'Nogueiró');
INSERT INTO CodigoPostal (id_codigoPostal, localidade) VALUES ('4300-095', 'Porto');
INSERT INTO CodigoPostal (id_codigoPostal, localidade) VALUES ('4480-004', 'Vila do Conde');

-- Adicionar Skills
INSERT INTO Skills (id_skills, tipoSkill) VALUES ('1', 'Designer');
INSERT INTO Skills (id_skills, tipoSkill) VALUES ('2', 'Programador');
INSERT INTO Skills (id_skills, tipoSkill) VALUES ('3', 'Fotografo');

-- Adicionar Tools
INSERT INTO Tools (id_tools, tipoTool) VALUES ('1', 'Illustrator');
INSERT INTO Tools (id_tools, tipoTool) VALUES ('2', 'Visual Code');
INSERT INTO Tools (id_tools, tipoTool) VALUES ('3', 'Photoshop');

-- Adicionar Cursos
INSERT INTO Cursos (id_cursos, tipoCurso) VALUES ('1', 'Licenciatura em Tecnologias e Sistemas de Informação Para a Web');
INSERT INTO Cursos (id_cursos, tipoCurso) VALUES ('2', 'Licenciatura em Fotografia');
INSERT INTO Cursos (id_cursos, tipoCurso) VALUES ('3', 'Licenciatura em Multimédia');

-- Adicionar Links
INSERT INTO Links (id_links, tipoLink) VALUES ('1', 'GitHub');
INSERT INTO Links (id_links, tipoLink) VALUES ('2', 'Behance');
INSERT INTO Links (id_links, tipoLink) VALUES ('3', 'GitBucket');

-- Adicionar professores 
INSERT INTO Professor (id_nroProfessor,password, nome, fotoLink, telemovel,email, id_codigoPostal) VALUES ('1000000','123456789', 'Roberto Fonseca','https://livinlavidarick.files.wordpress.com/2014/03/teacher.jpeg','964328416','roberto@roberto.com','4480-004');
INSERT INTO Professor (id_nroProfessor,password, nome, fotoLink, telemovel,email, id_codigoPostal) VALUES ('2000000','123456789', 'Guilherme Antunes','https://drmarcelodemarzo.com/wp-content/uploads/2020/07/professor-de-matematica-envelhecido-escrevendo-na-lousa_23-2148201011.jpg','914123945','guilherme@guilherme.com','4300-095');

-- Adicionar Empresas
INSERT INTO Empresa (id_empresa,nomeEmpresa, telemovel, morada,email, id_codigoPostal) VALUES('1','Blip','932499526', 'Av. de Camilo 94','communications@blip.pt','4300-095');
INSERT INTO Empresa (id_empresa,nomeEmpresa, telemovel, morada,email, id_codigoPostal) VALUES('2','DesignMasters','913679324', 'Rua da Inovação','communications@designMasters.pt','4480-004');

-- Tipo de emprego
INSERT INTO Tipo_Emprego (id_tipoEmprego, descricao) VALUES ('1', 'Estágio');
INSERT INTO Tipo_Emprego (id_tipoEmprego, descricao) VALUES ('2', 'PartTime');
INSERT INTO Tipo_Emprego (id_tipoEmprego, descricao) VALUES ('3', 'FullTime');

-- Adicionar Alumnis
INSERT INTO Alumni (id_nroEstudante, nome, dataNascimento, morada, email, fotoLink, telemovel, curriculumPDFLink, password, id_role, id_genero, id_nacionalidade, id_codigoPostal) VALUES ('19180045', 'Wisin Yandel', '1998-02-18', 'Rua das Batatas', 'ansssa@gmail.com', 'https://i.pinimg.com/originals/51/fe/18/51fe180cc453fccbf05652ad051b4803.jpg', '917574845', 'https://www.bridgemaneducation.com/documents/how-to-guide.pdf', '123456789', '3', '2', '1', '4770-440');
INSERT INTO Alumni (id_nroEstudante, nome, dataNascimento, morada, email, fotoLink, telemovel, curriculumPDFLink, password, id_role, id_genero, id_nacionalidade, id_codigoPostal) VALUES ('19180047', 'Rogelia Hernandes', '1998-02-18', 'Rua das Batatas', 'ansssa@gmail.com', 'https://i.pinimg.com/originals/51/fe/18/51fe180cc453fccbf05652ad051b4803.jpg', '917574845', 'https://www.bridgemaneducation.com/documents/how-to-guide.pdf', '123456789', '3', '2', '1', '4770-440');
INSERT INTO Alumni (id_nroEstudante, nome, dataNascimento, morada, email, fotoLink, telemovel, curriculumPDFLink, password, id_role, id_genero, id_nacionalidade, id_codigoPostal) VALUES ('19180048', 'Rogelia Hddddernandes', '1998-02-18', 'Rua das Batatas', 'ansssa@gmail.com', 'https://i.pinimg.com/originals/51/fe/18/51fe180cc453fccbf05652ad051b4803.jpg', '917574845', 'https://www.bridgemaneducation.com/documents/how-to-guide.pdf', '123456789', '3', '2', '1', '4770-440');

-- Adicionar Skill a Alumni
INSERT INTO Alumni_Skills (id_nroEstudante, id_skills, percentagem) VALUES(19180045, 3, 50);
INSERT INTO Alumni_Skills (id_nroEstudante, id_skills, percentagem) VALUES(19180047, 2, 50);

-- Adicionar Tool a Alumni
INSERT INTO Alumni_Tools (id_nroEstudante, id_tools, percentagem) VALUES(19180048, 3, 50);
INSERT INTO Alumni_Tools (id_nroEstudante, id_tools, percentagem) VALUES(19180047, 2, 63);

-- Adicionar curso a Alumni
INSERT INTO Alumni_Cursos (id_nroEstudante, id_cursos, anoCurso) VALUES(19180048, 3, 2017);
INSERT INTO Alumni_Cursos (id_nroEstudante, id_cursos, anoCurso) VALUES(19180047, 2, 2020);

-- Adicionar link a Alumni
INSERT INTO Alumni_Links (id_nroEstudante, id_links, link) VALUES(19180048, 3, 'githubcom/JokerWoman');
INSERT INTO Alumni_Links (id_nroEstudante, id_links, link) VALUES(19180047, 2, 'behancenet/ilseweisfelt');


