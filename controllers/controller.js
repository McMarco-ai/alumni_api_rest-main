const model = require('../models/model.js');
const validUrl = require('valid-url');

class Alumni {
    constructor(nome, dataNascimento, morada, email, fotoLink, telemovel, curriculumPDFLink, password, id_role, id_genero, id_nacionalidade, id_codigoPostal) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.morada = morada;
        this.email = email;
        this.fotoLink = fotoLink;
        this.telemovel = telemovel;
        this.curriculumPDFLink = curriculumPDFLink;
        this.password = password;
        this.id_role = id_role;
        this.id_genero = id_genero;
        this.id_nacionalidade = id_nacionalidade;
        this.id_codigoPostal = id_codigoPostal;
    }
}
class Bolsa {
    constructor(descricao, fotoLink, estado, data_publicacao, data_inicio, id_empresa, id_tipoEmprego, id_nroProfessor) {
        this.descricao = descricao;
        this.fotoLink = fotoLink;
        this.estado = estado;
        this.data_publicacao = data_publicacao;
        this.data_inicio = data_inicio;
        this.id_empresa = id_empresa;
        this.id_tipoEmprego = id_tipoEmprego;
        this.id_nroProfessor = id_nroProfessor;

    }
}
class Evento {
    constructor( titulo , data, fotoLink, informacao,  id_nroProfessor, id_tipoEvento) {
        this.fotoLink = fotoLink;
        this.titulo = titulo;
        this.data = data;
        this.informacao = informacao;
        this.id_nroProfessor = id_nroProfessor;
        this.id_tipoEvento = id_tipoEvento;
    }
}

exports.home = (req, res) => {
    res.status(200).json({
        message: "Home "
    });
};

exports.getAllAlumni = (req, res) => {
    model.getAllAlumni((err, data) => {
        if (err) // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving alumni."
            });
        else
            res.status(200).json(data); // send OK response with all alumni data
    });
};

exports.createAlumni = (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: "Body is empty!" });
        return;
    } else if (!req.body.id_nroEstudante) {
        res.status(400).json({ message: "Id Estudante must be sent!" });
        return;
    } else if (!req.body.nome) {
        res.status(400).json({ message: "Nome Estudante must be sent!" });
        return;
    } else if (!req.body.dataNascimento) {
        res.status(400).json({ message: "Data Nascimento must be sent!" });
        return;
    } else if (!req.body.morada) {
        res.status(400).json({ message: "Morada must be sent!" });
        return;
    } else if (!req.body.email) {
        res.status(400).json({ message: "Email must be sent!" });
        return;
    } else if (!req.body.fotoLink) {
        res.status(400).json({ message: "Foto must be sent!" });
        return;
    } else if (!req.body.telemovel) {
        res.status(400).json({ message: "Telemovel must be sent!" });
        return;
    } else if (!req.body.curriculumPDFLink) {
        res.status(400).json({ message: "Curriculum PDF Link must be sent!" });
        return;
    } else if (!req.body.password) {
        res.status(400).json({ message: "Password must be sent!" });
        return;
    } else if (!req.body.id_role) {
        res.status(400).json({ message: "Role ID must be sent!" });
        return;
    } else if (!req.body.id_genero) {
        res.status(400).json({ message: "Id Genero must be sent!" });
        return;
    } else if (!req.body.id_nacionalidade) {
        res.status(400).json({ message: "Id Nacionalidade must be sent!" });
        return;
    } else if (!req.body.id_codigoPostal) {
        res.status(400).json({ message: "Id codigo postal must be sent!" });
        return;
    }

    // create alumni
    let alumni = new Alumni(req.body.nome, req.body.dataNascimento, req.body.morada, req.body.email,
        req.body.fotoLink, req.body.telemovel, req.body.curriculumPDFLink, req.body.password, req.body.id_role,
        req.body.id_genero, req.body.id_nacionalidade, req.body.id_codigoPostal)

    model.createAlumni(alumni, req.body.id_nroEstudante, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error ao criar o Alumni with id ${req.body.id_nroEstudante}.`
                })
            } else if (err.kind === "erro_alumni_ja_existe") {
                res.status(417).json({
                    message: `Erro Alumni j?? exsite com id ${req.body.id_nroEstudante}.`
                })
            }
        } else {
            res.status(201).json({
                message: "New alumni created",
                location: "/alumni/" + data.insertId
            });
        }
    });
};


exports.home = (req, res) => {
    res.status(200).json({
        message: "Home "
    });
};

exports.findAlumniByNumeroEstudante = (req, res) => {
    model.findAlumniByNumeroEstudante(req.params.numero, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).json({
                    message: `Not found Alumni com numero estudante ${req.params.numero}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Alumni with id ${req.params.numero}.`
                });
        } else
            res.status(200).json(data);
    });
};

exports.createSkillFromNumeroEstudanteBySkillId = (req, res) => {

    if (!req.body || !req.body.percentagem) {
        res.status(400).json({ message: "Percentagem ?? obrigatorio no body!" });
        return;
    }

    if (!req.body.percentagem.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Percentagem tem que ser maior que zero e um numero positivo' });
        return;
    }

    if (parseInt(req.body.percentagem) > 100) {
        res.status(400).json({ message: 'Percentagem tem que ser menor que 100' });
        return;
    }

    const skill = {
        percentagem: parseInt(req.body.percentagem),
        id_nroEstudante: req.params.numero,
        id_skills: req.params.skillId
    };

    model.createSkillFromNumeroEstudanteBySkillId(skill, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de inserir uma skill com id ${skill.id_skills}.`
                })
            } else if (err.kind === "skill_nao_inserida") {
                res.status(404).json({
                    message: `Erro skill n??o inserida com id ${skill.id_skills}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${skill.id_nroEstudante}.`
                })
            }
        } else {
            res.status(201).json({
                message: "Novo Skill criada."
            });
        }
    });
};


exports.createToolFromNumeroEstudanteByToolId = (req, res) => {

    if (!req.body || !req.body.percentagem) {
        res.status(400).json({ message: "Percentagem ?? obrigatorio no body!" });
        return;
    }

    if (!req.body.percentagem.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Percentagem tem que ser maior que zero e um numero positivo' });
        return;
    }

    if (parseInt(req.body.percentagem) > 100) {
        res.status(400).json({ message: 'Percentagem tem que ser menor que 100' });
        return;
    }

    const tool = {
        percentagem: parseInt(req.body.percentagem),
        id_nroEstudante: req.params.numero,
        id_tools: req.params.toolId
    };

    model.createToolFromNumeroEstudanteByToolId(tool, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de inserir uma tool com id ${tool.id_tools}.`
                })
            } else if (err.kind === "tool_nao_inserida") {
                res.status(404).json({
                    message: `Erro tool n??o inserida com id ${tool.id_tools}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${tool.id_nroEstudante}.`
                })
            }
        } else {
            res.status(201).json({
                message: "Novo Tool criada."
            });
        }
    });
};




exports.createCursoFromNumeroEstudanteByCursoId = (req, res) => {

    if (!req.body || !req.body.anoCurso) {
        res.status(400).json({ message: "Ano do curso ?? obrigatorio no body!" });
        return;
    }

    if (!req.body.anoCurso.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'o Ano do curso tem que ser maior que zero e um numero positivo' });
        return;
    }

    if (parseInt(req.body.anoCurso) < 2016) {
        res.status(400).json({ message: 'Ano do curso tem que ser mayor a que 2016' });
        return;
    }

    const curso = {
        anoCurso: parseInt(req.body.anoCurso),
        id_nroEstudante: req.params.numero,
        id_cursos: req.params.cursoId
    };

    model.createCursoFromNumeroEstudanteByCursoId(curso, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de inserir uma curso com id ${curso.id_cursos}.`
                })
            } else if (err.kind === "curso_nao_inserida") {
                res.status(404).json({
                    message: `Erro curso n??o inserida com id ${curso.id_cursos}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${curso.id_nroEstudante}.`
                })
            }
        } else {
            res.status(201).json({
                message: "Novo curso criada."
            });
        }
    });
};

exports.createLinkFromNumeroEstudanteByLinkId = (req, res) => {
    if (!req.body || !req.body.link) {
        res.status(400).json({ message: "link ?? obrigatorio no body!" });
        return;
    }

    if (!validUrl.isUri(req.body.link)) {
        res.status(400).json({ message: 'o link deve ser valido ' });
        return;
    }

    const link = {
        link: req.body.link,
        id_nroEstudante: req.params.numero,
        id_links: req.params.linkId
    };

    model.createLinkFromNumeroEstudanteByLinkId(link, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de inserir uma link com id ${link.id_links}.`
                })
            } else if (err.kind === "link_nao_inserida") {
                res.status(404).json({
                    message: `Erro link n??o inserida com id ${link.id_links}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${link.id_nroEstudante}.`
                })
            }
        } else {
            res.status(201).json({
                message: "Novo link criada."
            });
        }
    });
};

exports.updateSkillFromNumeroEstudanteBySkillId = (req, res) => {

    if (!req.body || !req.body.percentagem) {
        res.status(400).json({ message: "Percentagem ?? obrigatorio no body!" });
        return;
    }

    if (!req.body.percentagem.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Percentagem tem que ser maior que zero e um numero positivo' });
        return;
    }

    if (parseInt(req.body.percentagem) > 100) {
        res.status(400).json({ message: 'Percentagem tem que ser menor que 100' });
        return;
    }

    model.updateSkillFromNumeroEstudanteBySkillId(req.params.numero, req.params.skillId, parseInt(req.body.percentagem), (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de update de uma skill com id ${req.params.skillId}.`
                })
            } else if (err.kind === "skill_nao_updated") {
                res.status(404).json({
                    message: `Erro skill n??o updated com id ${req.params.skillId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else {
            res.status(200).json({ message: "Updated skill." });
        }
    });
};



exports.updateToolFromNumeroEstudanteByToolId = (req, res) => {

    if (!req.body || !req.body.percentagem) {
        res.status(400).json({ message: "Percentagem ?? obrigatorio no body!" });
        return;
    }

    if (!req.body.percentagem.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Percentagem tem que ser maior que zero e um numero positivo' });
        return;
    }

    if (parseInt(req.body.percentagem) > 100) {
        res.status(400).json({ message: 'Percentagem tem que ser menor que 100' });
        return;
    }

    model.updateToolFromNumeroEstudanteByToolId(req.params.numero, req.params.toolId, parseInt(req.body.percentagem), (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de update de uma tool com id ${req.params.toolId}.`
                })
            } else if (err.kind === "tool_nao_updated") {
                res.status(404).json({
                    message: `Erro tool n??o updated com id ${req.params.toolId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else {
            res.status(200).json({ message: "Updated tool." });
        }
    });
};

exports.updateCursoFromNumeroEstudanteByCursoId = (req, res) => {

    if (!req.body || !req.body.anoCurso) {
        res.status(400).json({ message: "Ano Curso ?? obrigatorio no body!" });
        return;
    }

    if (!req.body.anoCurso.match(/^(0|[1-9]\d*)$/g)) {
        res.status(400).json({ message: 'Ano Curso tem que ser maior que zero e um numero positivo' });
        return;
    }

    if (parseInt(req.body.anoCurso) < 2016) {
        res.status(400).json({ message: 'Ano Curso tem que ser menor que 2016' });
        return;
    }

    model.updateCursoFromNumeroEstudanteByCursoId(req.params.numero, req.params.cursoId, parseInt(req.body.anoCurso), (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de update de uma curso com id ${req.params.cursoId}.`
                })
            } else if (err.kind === "curso_nao_updated") {
                res.status(404).json({
                    message: `Erro curso n??o updated com id ${req.params.cursoId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else {
            res.status(200).json({ message: "Updated curso." });
        }
    });
};



exports.updateLinkFromNumeroEstudanteByLinkId = (req, res) => {

    if (!req.body || !req.body.link) {
        res.status(400).json({ message: "link ?? obrigatorio no body!" });
        return;
    }

    if (!validUrl.isUri(req.body.link)) {
        res.status(400).json({ message: 'o link deve ser valido ' });
        return;
    }

    model.updateLinkFromNumeroEstudanteByLinkId(req.params.numero, req.params.linkId, req.body.link, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de update de uma link com id ${req.params.linkId}.`
                })
            } else if (err.kind === "link_nao_updated") {
                res.status(404).json({
                    message: `Erro link n??o updated com id ${req.params.linkId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else {
            res.status(200).json({ message: "Updated link." });
        }
    });
};



exports.deleteSkillFromNumeroEstudanteBySkillId = (req, res) => {
    model.deleteSkillFromNumeroEstudanteBySkillId(req.params.numero, req.params.skillId, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de delete de uma skill com id ${req.params.skillId}.`
                })
            } else if (err.kind === "skill_nao_apagada") {
                res.status(404).json({
                    message: `Erro skill n??o apagada com id ${req.params.skillId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};


exports.deleteToolFromNumeroEstudanteByToolId = (req, res) => {
    model.deleteToolFromNumeroEstudanteByToolId(req.params.numero, req.params.toolId, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de delete de uma tool com id ${req.params.toolId}.`
                })
            } else if (err.kind === "tool_nao_apagada") {
                res.status(404).json({
                    message: `Erro tool n??o apagada com id ${req.params.toolId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};



exports.deleteCursoFromNumeroEstudanteByCursoId = (req, res) => {
    model.deleteCursoFromNumeroEstudanteByCursoId(req.params.numero, req.params.cursoId, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de delete de uma curso com id ${req.params.cursoId}.`
                })
            } else if (err.kind === "curso_nao_apagada") {
                res.status(404).json({
                    message: `Erro curso n??o apagada com id ${req.params.cursoId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};


exports.deleteLinkFromNumeroEstudanteByLinkId = (req, res) => {
    model.deleteLinkFromNumeroEstudanteByLinkId(req.params.numero, req.params.linkId, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de delete de uma link com id ${req.params.linkId}.`
                })
            } else if (err.kind === "link_nao_apagada") {
                res.status(404).json({
                    message: `Erro link n??o apagada com id ${req.params.linkId}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};


exports.getSkillsFromNumeroEstudante = (req, res) => {
    model.getSkillsFromNumeroEstudante(req.params.numero, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o no get das skill do estudante com id ${req.params.numero}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};

exports.getToolsFromNumeroEstudante = (req, res) => {
    model.getToolsFromNumeroEstudante(req.params.numero, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o no get das tool do estudante com id ${req.params.numero}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};


exports.getCursosFromNumeroEstudante = (req, res) => {
    model.getCursosFromNumeroEstudante(req.params.numero, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o no get das curso do estudante com id ${req.params.numero}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};

exports.getLinksFromNumeroEstudante = (req, res) => {
    model.getLinksFromNumeroEstudante(req.params.numero, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o no get das link do estudante com id ${req.params.numero}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else
            res.status(200).json(data);
    });
};


exports.updateAlumniByNumeroEstudante = (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: "Body is empty!" });
        return;
    } else if (!req.body.nome) {
        res.status(400).json({ message: "Nome Estudante must be sent!" });
        return;
    } else if (!req.body.dataNascimento) {
        res.status(400).json({ message: "Data Nascimento must be sent!" });
        return;
    } else if (!req.body.morada) {
        res.status(400).json({ message: "Morada must be sent!" });
        return;
    } else if (!req.body.email) {
        res.status(400).json({ message: "Email must be sent!" });
        return;
    } else if (!req.body.fotoLink) {
        res.status(400).json({ message: "Foto must be sent!" });
        return;
    } else if (!req.body.telemovel) {
        res.status(400).json({ message: "Telemovel must be sent!" });
        return;
    } else if (!req.body.curriculumPDFLink) {
        res.status(400).json({ message: "Curriculum PDF Link must be sent!" });
        return;
    } else if (!req.body.password) {
        res.status(400).json({ message: "Password must be sent!" });
        return;
    } else if (!req.body.id_role) {
        res.status(400).json({ message: "Role ID must be sent!" });
        return;
    } else if (!req.body.id_genero) {
        res.status(400).json({ message: "Id Genero must be sent!" });
        return;
    } else if (!req.body.id_nacionalidade) {
        res.status(400).json({ message: "Id Nacionalidade must be sent!" });
        return;
    } else if (!req.body.id_codigoPostal) {
        res.status(400).json({ message: "Id codigo postal must be sent!" });
        return;
    }

    let alumni = new Alumni(req.body.nome, req.body.dataNascimento, req.body.morada, req.body.email,
        req.body.fotoLink, req.body.telemovel, req.body.curriculumPDFLink, req.body.password, req.body.id_role,
        req.body.id_genero, req.body.id_nacionalidade, req.body.id_codigoPostal)

    model.updateAlumniByNumeroEstudante(alumni, req.params.numero, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(500).json({
                    message: `Error na opera????o de update de um alumni com id ${req.params.numero}.`
                })
            } else if (err.kind === "alumni_nao_updated") {
                res.status(404).json({
                    message: `Erro alumni n??o updated com id ${req.params.numero}.`
                })
            } else if (err.kind === "not_found_alumni") {
                res.status(404).json({
                    message: `Erro alumni n??o existe com id ${req.params.numero}.`
                })
            }
        } else {
            res.status(200).json({
                message: "updated tutorial ",
                location: `/alumni/${req.params.numero}`
            });
        }
    });
};
exports.getAllBolsas = (req, res) => {
    model.getAllBolsas((err, data) => {
        if (err) { // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving offers."
            });
        } else
            res.status(200).json(data); // send OK response with all bolsas data
    });
};


exports.createBolsa = (req, res) => {

    if (!req.body.descricao) {
        res.status(400).json({ message: "Descricao is empty!" });
        return;

    }
    if (!req.body.fotoLink) {
        res.status(400).json({ message: "Foto must be sent!" });
        return;
    } else if (!req.body.estado) {
        res.status(400).json({ message: "Estado must be sent!" });
        return;
    } else if (!req.body.data_publicacao) {
        res.status(400).json({ message: "Data Publica????o must be sent!" });
        return;
    } else if (!req.body.data_inicio) {
        res.status(400).json({ message: "Data Inicio must be sent!" });
        return;
    } else if (!req.body.id_empresa) {
        res.status(400).json({ message: "ID Empresa must be sent!" });
        return;
    } else if (!req.body.id_tipoEmprego) {
        res.status(400).json({ message: "ID Tipo Emprego must be sent!" });
        return;
    } else if (!req.body.id_nroProfessor) {
        res.status(400).json({ message: "ID Nro Professor must be sent!" });
        return;
    }
    let bolsa = new Bolsa(req.body.descricao, req.body.fotoLink, req.body.estado, req.body.data_publicacao,
        req.body.data_inicio, req.body.id_empresa, req.body.id_tipoEmprego, req.body.id_nroProfessor)

    model.createBolsa(bolsa, (err, data) => {
        if (err) // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while creating the bolsa."
            });
        else
            res.status(201).json({
                message: "New bolsa created",
                location: "/bolsas/" + data.insertId
            });
    });


};

exports.deleteBolsa = (req, res) => {
    model.deleteBolsa(req.params.bolsaID, (err, data) => {

        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(404).send({
                    message: `Not found bolsa with id ${req.params.bolsaID}`
                });
            } else if (err.kind === "bolsa_nao_apagada") {
                res.status(500).send({
                    message: err.message || "Error deleting bolsa with id" + req.params.bolsaID
                });
            } else if (err.kind === "not_found_bolsa") {
                res.status(404).json({
                    message: `Erro bolsa n??o existe com id ${req.params.bolsaID}.`
                })
            }
        } else {
            res.status(200).json({ message: `Bolsa with id ${req.params.bolsaID} was successfully deleted!` });
        }

    })
};

exports.getBolsaById = (req, res) => {
    model.getBolsaById(req.params.bolsaID, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).json({
                    message: `Not found Bolsa com id ${req.params.bolsaID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Bolsa with id ${req.params.bolsaID}.`
                })
        } else
            res.status(200).json(data);
    })
};

exports.updateBolsaById = (req, res) => {

    if (!req.body.descricao) {
        res.status(400).json({ message: "Descricao is empty!" });
        return;

    }
    if (!req.body.fotoLink) {
        res.status(400).json({ message: "Foto must be sent!" });
        return;
    } else if (!req.body.estado) {
        res.status(400).json({ message: "Estado must be sent!" });
        return;
    } else if (!req.body.data_publicacao) {
        res.status(400).json({ message: "Data Publica????o must be sent!" });
        return;
    } else if (!req.body.data_inicio) {
        res.status(400).json({ message: "Data Inicio must be sent!" });
        return;
    } else if (!req.body.id_empresa) {
        res.status(400).json({ message: "ID Empresa must be sent!" });
        return;
    } else if (!req.body.id_tipoEmprego) {
        res.status(400).json({ message: "ID Tipo Emprego must be sent!" });
        return;
    } else if (!req.body.id_nroProfessor) {
        res.status(400).json({ message: "ID Nro Professor must be sent!" });
        return;
    }
    let bolsa = new Bolsa(req.body.descricao, req.body.fotoLink, req.body.estado, req.body.data_publicacao,
        req.body.data_inicio, req.body.id_empresa, req.body.id_tipoEmprego, req.body.id_nroProfessor)

    model.updateBolsaById(bolsa, req.params.bolsaID, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(404).send({
                    message: `Not found bolsa with id ${req.params.bolsaID}`
                });
            } else if (err.kind === "bolsa_nao_updated") {
                res.status(500).send({
                    message: err.message || "Error updating bolsa with id" + req.params.bolsaID
                });
            } else if (err.kind === "not_found_bolsa") {
                res.status(404).json({
                    message: `Erro bolsa n??o existe com id ${req.params.bolsaID}.`
                })
            }
        }
        else {
            res.status(200).json({
                message: "updated bolsas ",
                location: `/bolsas/${req.params.bolsaID}`
            });
        }
    });
};
exports.getAllEventos = (req, res) => {
    model.getAllEventos((err, data) => {
        if (err) { // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving offers."
            });
        } else
            res.status(200).json(data); // send OK response with all eventos data
    });
};
exports.createEvento = (req, res) => {

    if (!req.body.titulo) {
        res.status(400).json({ message: "Titulo is empty!" });
        return;

    }
    if (!req.body.fotoLink) {
        res.status(400).json({ message: "Foto must be sent!" });
        return;
    } else if (!req.body.data) {
        res.status(400).json({ message: "Data must be sent!" });
        return;
    } else if (!req.body.informacao) {
        res.status(400).json({ message: "Informa????o must be sent!" });
        return;
    } else if (!req.body.id_tipoEvento) {
        res.status(400).json({ message: "ID Tipo Evento must be sent!" });
        return;
    } else if (!req.body.id_nroProfessor) {
        res.status(400).json({ message: "ID Nro Professor must be sent!" });
        return;
    }   
     let evento = new Evento( req.body.titulo , req.body.data, req.body.fotoLink, req.body.informacao,  req.body.id_nroProfessor, req.body.id_tipoEvento)



    model.createEvento(evento, (err, data) => {
        if (err) // send error response
            res.status(500).send({
                message: err.message || "Some error occurred while creating the evento."
            });
        else
            res.status(201).json({
                message: "New evento created",
                location: "/eventos/" + data.insertId
            });
    });


};

exports.deleteEvento = (req, res) => {
    model.deleteEvento(req.params.eventoID, (err, data) => {

        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(404).send({
                    message: `Not found evento with id ${req.params.eventoID}`
                });
            } else if (err.kind === "evento_nao_apagada") {
                res.status(500).send({
                    message: err.message || "Error deleting evento with id" + req.params.eventoID
                });
            } else if (err.kind === "not_found_evento") {
                res.status(404).json({
                    message: `Erro evento n??o existe com id ${req.params.eventoID}.`
                })
            }
        } else {
            res.status(200).json({ message: `Evento with id ${req.params.eventoID} was successfully deleted!` });
        }

    })
};
exports.getEventoById = (req, res) => {
    model.getEventoById(req.params.eventoID, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).json({
                    message: `Not found Evento com id ${req.params.eventoID}.`
                });
            else
                res.status(500).json({
                    message: `Error retrieving Evento with id ${req.params.eventoID}.`
                })
        } else
            res.status(200).json(data);
    })
};
exports.updateEventoById = (req, res) => {

    if (!req.body.titulo) {
        res.status(400).json({ message: "Titulo is empty!" });
        return;

    }
    if (!req.body.fotoLink) {
        res.status(400).json({ message: "Foto must be sent!" });
        return;
    } else if (!req.body.data) {
        res.status(400).json({ message: "Data must be sent!" });
        return;
    } else if (!req.body.informacao) {
        res.status(400).json({ message: "Informa????o must be sent!" });
        return;
    } else if (!req.body.id_tipoEvento) {
        res.status(400).json({ message: "ID Tipo Evento must be sent!" });
        return;
    } else if (!req.body.id_nroProfessor) {
        res.status(400).json({ message: "ID Nro Professor must be sent!" });
        return;
    }
    let evento = new Evento( req.body.titulo , req.body.data, req.body.fotoLink, req.body.informacao,  req.body.id_nroProfessor, req.body.id_tipoEvento)
    

    model.updateEventoById(evento, req.params.eventoID, (err, data) => {
        if (err) {
            if (err.kind === "erro_operacao") {
                res.status(404).send({
                    message: `Not found evento with id ${req.params.eventoID}`
                });
            } else if (err.kind === "evento_nao_updated") {
                res.status(500).send({
                    message: err.message || "Error updating evento with id" + req.params.eventoID
                });
            } else if (err.kind === "not_found_evento") {
                res.status(404).json({
                    message: `Erro evento n??o existe com id ${req.params.eventoID}.`
                })
            }
        }
        else {
            res.status(200).json({
                message: "updated evento ",
                location: `/eventos/${req.params.eventoID}`
            });
        }
    });
};