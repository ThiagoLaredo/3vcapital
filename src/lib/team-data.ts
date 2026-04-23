export interface TeamMember {
  id: string;
  name: {
    pt: string;
    en: string;
  };
  role: {
    pt: string;
    en: string;
  };
  photo: string;
  companies: string[];
  shortBio: {
    pt: string;
    en: string;
  };
  fullBio: {
    pt: string;
    en: string;
  };
  linkedin?: string;
  email?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'luciane',
    name: {
      pt: 'Luciane Ribeiro',
      en: 'Luciane Ribeiro'
    },
    role: {
      pt: 'Sócia-fundadora',
      en: 'Founding Partner'
    },
    photo: '/images/equipe/luciane-ribeiro.webp',
    companies: [],
    shortBio: {
      pt: 'Economista de formação, com 36 anos de experiência no mercado financeiro, trabalhando em grandes Bancos como Boston, Safra, ABN-AMRO, Santander e Alfa em áreas como Mercado de Capitais, Asset, Private e Wealth Management.',
      en: 'Economist by training, with 36 years of experience in the financial market, working at major banks such as Boston, Safra, ABN-AMRO, Santander and Alfa in areas such as Capital Markets, Asset, Private and Wealth Management.'
    },
    fullBio: {
      pt: `Economista de formação, com 36 anos de experiência no mercado financeiro, trabalhando em grandes Bancos como Boston, Safra, ABN-AMRO, Santander e Alfa em áreas como Mercado de Capitais, Asset, Private e Wealth Management. Foi responsável pela gestão da fortuna pessoal da família Safra durante 15 anos e foi CEO da Asset Management do Santander de 2006 a 2016.

Atualmente é membro do Comitê de Investimentos do Fundo de Pensão da ONU nos USA representando a América Latina. Luciane é uma das fundadoras e Conselheira da W.I.L.L. - Women in Leadership in Latin America e faz trabalho voluntário como Diretora Tesoureira na UNIBES - União Brasileira-Israelita do Bem-Estar Social uma entidade com 104 anos de atuação no Brasil.`,
      en: `Economist by training, with 36 years of experience in the financial market, working at major banks such as Boston, Safra, ABN-AMRO, Santander and Alfa in areas such as Capital Markets, Asset, Private and Wealth Management. Was responsible for managing the personal fortune of the Safra family for 15 years and was CEO of Santander Asset Management from 2006 to 2016.

Currently a member of the Investment Committee of the UN Pension Fund in the USA representing Latin America. Luciane is one of the founders and Board Member of W.I.L.L. - Women in Leadership in Latin America and volunteers as Treasurer Director at UNIBES - Brazilian-Israeli Union for Social Welfare, an entity with 104 years of operation in Brazil.`
    },
    linkedin: 'https://www.linkedin.com/in/lucianeribeiro/'
  },
  {
    id: 'ana-maria',
    name: {
      pt: 'Ana Maria Imbiriba Corrêa',
      en: 'Ana Maria Imbiriba Corrêa'
    },
    role: {
      pt: 'Sócia',
      en: 'Partner'
    },
    photo: '/images/equipe/ana-maria-imbiriba-correa.webp',
    companies: [],
    shortBio: {
      pt: 'Executiva jurídica com 25 anos de experiência profissional em instituições financeiras internacionais de grande porte, com forte atuação nas áreas de Mercado de Capitais, Asset Management, Compliance, M&A, Societária e Governança Corporativa.',
      en: 'Legal executive with 25 years of professional experience in large international financial institutions, with strong expertise in Capital Markets, Asset Management, Compliance, M&A, Corporate and Corporate Governance.'
    },
    fullBio: {
      pt: `Executiva jurídica com 25 anos de experiência profissional em instituições financeiras internacionais de grande porte, com forte atuação nas áreas de Mercado de Capitais, Asset Management, Compliance, M&A, Societária e Governança Corporativa.

Atuou também por 3 anos na área de cooperativismo de crédito integrando o corpo técnico de assessoria ao Fundo Garantidor de Crédito Cooperativo - FGCOOP e ao Conselho Consultivo do Ramo Crédito da Organização das Cooperativas Brasileiras – OCB.

Membro do Conselho de Recursos do Sistema Financeiro Nacional - CRSFN, órgão colegiado, de segundo grau, integrante da estrutura do Ministério da Economia que tem por finalidade julgar, em última instância administrativa, os recursos contra as sanções aplicadas pelo BACEN e CVM e, nos processos de lavagem de dinheiro, as sanções aplicadas pelo COAF.`,
      en: `Legal executive with 25 years of professional experience in large international financial institutions, with strong expertise in Capital Markets, Asset Management, Compliance, M&A, Corporate and Corporate Governance.

Also worked for 3 years in the credit cooperative sector as part of the technical advisory team to the Cooperative Credit Guarantee Fund - FGCOOP and the Credit Branch Advisory Council of the Brazilian Cooperative Organization – OCB.

Member of the National Financial System Appeals Council - CRSFN, a second-degree collegiate body within the Ministry of Economy structure, whose purpose is to judge, in the last administrative instance, appeals against sanctions applied by BACEN and CVM and, in money laundering cases, sanctions applied by COAF.`
    },
    linkedin: 'https://www.linkedin.com/in/ana-maria-imbiriba-corr%C3%AAa-b18447102/'
  },
  {
    id: 'andre',
    name: {
      pt: 'André Palhari Vasconcelos',
      en: 'André Palhari Vasconcelos'
    },
    role: {
      pt: 'Sócio',
      en: 'Partner'
    },
    photo: '/images/equipe/andre-palhari-vasconcelos.webp',
    companies: [],
    shortBio: {
      pt: 'Administrador de Empresas de formação, possui mais de 10 anos de experiência na área de gestão de recursos. Foi gestor responsável pela área de Fund of Funds do Banco Alfa de Investimento.',
      en: 'Business Administrator by training, with over 10 years of experience in asset management. Was the manager responsible for the Fund of Funds area at Banco Alfa de Investimento.'
    },
    fullBio: {
      pt: `Administrador de Empresas de formação, possui mais de 10 anos de experiência na área de gestão de recursos. Foi gestor responsável pela área de Fund of Funds do Banco Alfa de Investimento e analista sênior da área de Gestão de Patrimônio da Votorantim Asset Management.

Possui Certificação de Gestores Anbima (CGA), Certificate in Financial Management (Insper) e MBA em Finanças (Insper).`,
      en: `Business Administrator by training, with over 10 years of experience in asset management. Was the manager responsible for the Fund of Funds area at Banco Alfa de Investimento and senior analyst in the Wealth Management area at Votorantim Asset Management.

Holds ANBIMA Fund Manager Certification (CGA), Certificate in Financial Management (Insper) and MBA in Finance (Insper).`
    },
    linkedin: 'https://www.linkedin.com/in/andr%C3%A9-palhari-vasconcelos-764b21b0/'
  },
  {
    id: 'gianluca',
    name: {
      pt: 'Gianluca Rosales',
      en: 'Gianluca Rosales'
    },
    role: {
      pt: 'Sócio',
      en: 'Partner'
    },
    photo: '/images/equipe/gianluca-rosales.webp',
    companies: [],
    shortBio: {
      pt: 'Economista de formação pelo Insper, com 6 anos de experiência no mercado financeiro. Foi trader na mesa de operações da Matriz Capital.',
      en: 'Economist by training from Insper, with 6 years of experience in the financial market. Was a trader at the Matriz Capital trading desk.'
    },
    fullBio: {
      pt: `Sócio. Economista de formação pelo Insper, com 6 anos de experiência no mercado financeiro. Foi trader na mesa de operações da Matriz Capital.

Possui Certificação Profissional ANBIMA Série 20 (CPA-20) e de Gestores Anbima (CGA).`,
      en: `Partner. Economist by training from Insper, with 6 years of experience in the financial market. Was a trader at the Matriz Capital trading desk.

Holds ANBIMA Professional Certification Series 20 (CPA-20) and ANBIMA Fund Manager Certification (CGA).`
    },
    linkedin: 'https://www.linkedin.com/in/gianluca-rosales/'
  }
];