export interface DadataPartyData {
  inn: string;
  kpp: string | null;
  kpp_largest: string | null;
  ogrn: string;
  ogrn_date: number;
  hid: string;
  type: 'LEGAL' | 'INDIVIDUAL';
 
  name: {
    full_with_opf: string;
    short_with_opf: string;
    latin: string | null;
    full: string;
    short: string;
  };
 
  fio: {
    surname: string | null;
    name: string | null;
    patronymic: string | null;
    gender: null;
    source: null;
    qc: null;
  } | null;
 
  okato: string | null;
  oktmo: string | null;
  okpo: string | null;
  okogu: string | null;
  okfs: string | null;
  okved: string | null;
  okved_type: '2001' | '2014' | null;
 
  okveds: {
    main: boolean;
    type: '2001' | '2014';
    code: string;
    name: string;
  }[] | null;
 
  opf: {
    code: string;
    full: string;
    short: string;
    type: '99' | '2012' | '2014';
  };
 
  management: {
    name: string;
    post: string;
    start_date: number;
  } | null;
 
  branch_count: number;
  branch_type: 'MAIN' | 'BRANCH';
 
  address: {
    value: string;
    unrestricted_value: string;
    data: {
      source: string;
      qc: 0 | 1 | 3;
      [key: string]: unknown;
    };
  };
 
  state: {
    actuality_date: number;
    registration_date: number;
    liquidation_date: number | null;
    status: 'ACTIVE' | 'LIQUIDATING' | 'LIQUIDATED' | 'BANKRUPT' | 'REORGANIZING';
    code: string | null;
  };
 
  employee_count: number | null;
 
  finance: {
    tax_system: 'AUSN' | 'ESHN' | 'SRP' | 'USN' | null;
  } | null;
 
  authorities: {
    fts_registration: DadataAuthority | null;
    fts_report: DadataAuthority | null;
    pf: DadataAuthority | null;
    sif: DadataAuthority | null;
  } | null;
 
  citizenship: {
    code: {
      numeric: string;
      alpha_3: string;
    };
    name: {
      full: string;
      short: string;
    };
  } | null;
}
 
interface DadataAuthority {
  type: string;
  code: string;
  name: string;
  address: string;
}