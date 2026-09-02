export interface IRequisite {
  ID: string
  ENTITY_TYPE_ID: number
  ENTITY_ID: number
  PRESET_ID: number
  NAME: string
  CODE?: string
  SORT: number
  ACTIVE: 'Y' | 'N'
  RQ_INN?: string
  RQ_KPP?: string
  RQ_IFNS?: string
  RQ_OGRN?: string
  RQ_OGRNIP?: string
  RQ_OKPO?: string
}
export interface ICompnany {
  ID: string
  COMPANY_TYPE: string
  TITLE: string

  LOGO: string | undefined
  LEAD_ID: number | undefined

  HAS_PHONE: 'Y' | 'N'
  HAS_EMAIL: 'Y' | 'N'
  HAS_IMOL: 'Y' | 'N'

  ASSIGNED_BY_ID: string
  CREATED_BY_ID: string
  MODIFY_BY_ID: string

  BANKING_DETAILS: string | undefined
  INDUSTRY: string | undefined

  REVENUE: number | undefined
  CURRENCY_ID: string | undefined
  EMPLOYEES: string | undefined

  COMMENTS: string | undefined

  DATE_CREATE: string
  DATE_MODIFY: string

  OPENED: 'Y' | 'N'
  IS_MY_COMPANY: 'Y' | 'N'

  ORIGINATOR_ID: string | undefined
  ORIGIN_ID: string | undefined
  ORIGIN_VERSION: string | undefined

  ADDRESS: string | undefined
  ADDRESS_2: string | undefined
  ADDRESS_CITY: string | undefined
  ADDRESS_POSTAL_CODE: string | undefined
  ADDRESS_REGION: string | undefined
  ADDRESS_PROVINCE: string | undefined
  ADDRESS_COUNTRY: string | undefined
  ADDRESS_COUNTRY_CODE: string | undefined
  ADDRESS_LOC_ADDR_ID: string | undefined

  ADDRESS_LEGAL: string | undefined

  REG_ADDRESS: string | undefined
  REG_ADDRESS_2: string | undefined
  REG_ADDRESS_CITY: string | undefined
  REG_ADDRESS_POSTAL_CODE: string | undefined
  REG_ADDRESS_REGION: string | undefined
  REG_ADDRESS_PROVINCE: string | undefined
  REG_ADDRESS_COUNTRY: string | undefined
  REG_ADDRESS_COUNTRY_CODE: string | undefined
  REG_ADDRESS_LOC_ADDR_ID: string | undefined

  UTM_SOURCE: string | undefined
  UTM_MEDIUM: string | undefined
  UTM_CAMPAIGN: string | undefined
  UTM_CONTENT: string | undefined
  UTM_TERM: string | undefined

  LAST_ACTIVITY_BY: string
  LAST_ACTIVITY_TIME: string
  LAST_COMMUNICATION_TIME: string | undefined

  USER_FIELDS?: IField[]
}
export interface IField {
  type: string
  isRequired: number
  isReadOnly: number
  isImmutable: number
  isMultiple: number
  isDynamic: number
  title: string
}

export interface BitrixCompanyFm {
  id: number
  valueType: string
  value: string
  typeId: string
}

export interface NewBitrixCompany {
  id: number
  createdTime: string
  updatedTime: string
  createdBy: number
  updatedBy: number
  assignedById: number
  opened: string
  title: string
  logo: string
  address: string
  addressLegal: string
  bankingDetails: string
  comments: string
  typeId: string
  industry: string
  revenue: number
  currencyId: string
  employees: string
  leadId: number
  webformId: number
  originatorId: string | null
  originId: string | null
  originVersion: string | null
  hasPhone: string
  hasEmail: string
  hasImol: string
  isMyCompany: string
  searchContent: string
  categoryId: number
  lastActivityBy: number
  lastActivityTime: string
  emailHome: string
  emailWork: string
  emailMailing: string
  phoneMobile: string
  phoneWork: string
  phoneMailing: string
  imol: string
  email: string
  phone: string
  lastCommunicationTime: string | null
  lastCommunicationCallTime: string | null
  lastCommunicationEmailTime: string | null
  lastCommunicationImolTime: string | null
  lastCommunicationWebformTime: string | null
  ufLogo: string | null
  ufStamp: string | null
  ufDirectorSign: string | null
  ufAccountantSign: string | null
  parentId1058: number | null
  parentId1066: number | null
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  utmContent: string | null
  utmTerm: string | null
  observers: number[]
  contactIds: number[]
  entityTypeId: number
  fm: BitrixCompanyFm[]
  [key: `ufCrm${string}`]: string | null
}