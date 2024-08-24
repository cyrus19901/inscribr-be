type JSONArray = Array<JSONValue>;

type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

export interface JwtPayload {
  email: string;
}

export interface RawBodyRequest extends Request {
  body: any;
  rawBody: Buffer;
}

export interface ContentTwitterLike {
  twitterId: string;
  twitterName: string;
}

export interface ContentTwitterReply {
  twitterId: string;
  twitterName: string;
}

export interface ContentTwitterRetweet {
  twitterId: string;
  twitterName: string;
}

export interface ContentTwitterFollow {
  twitterUsername: string;
  twitterName: string;
}

export interface GoogleUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  partner?: string;
}

export interface FacebookUser {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  partner?: string;
}

export class InscriptionObject {
  tokens: TokenObject[];
}

export interface InscriptionCollection {
  symbol: string;
  name: string;
  imageURI: string;
  chain: string;
  inscriptionIcon: string;
  description: string;
}

export interface TokenObject {
  id: string;
  contentURI: string;
  contentType: string;
  contentBody: string;
  contentPreviewURI: string;
  genesisTransaction: string;
  genesisTransactionBlockHash: string;
  genesisTransactionBlockHeight: number;
  inscriptionNumber: number;
  locationBlockHeight: number;
  locationBlockTime: string;
  locationBlockHash: string;
  output: string;
  outputValue: number;
  owner: string;
  listed: boolean;
  sat: number;
  satName: string;
  satRarity: string;
  satBlockHeight: number;
  satributes: string[];
  displayName: string;
  collectionSymbol?: string;
  collection?: InscriptionCollection;
}

export interface UtxoObject {
  txid: string;
  vout: number;
  satoshi: number;
  scriptType: string;
  scriptPk: string;
  codeType: number;
  address: string;
  height: number;
  idx: number;
  isOpInRBF: boolean;
  isSpent: boolean;
}

export interface ParentInscriptionUtxo {
  data: UtxoObject;
}

export interface UnisatUtxo {
  cursor: number;
  total: number;
  totalConfirmed: number;
  totalUnconfirmed: number;
  totalUnconfirmedSpend: number;
  totalRunes: number;
  utxo: UtxoObject[];
}

export interface UnisatUtxoData {
  data: UnisatUtxo;
}

export interface UnisatAddressBalance {
  address: string;
  satoshi: number;
  pendingSatoshi: number;
  utxoCount: number;
  btcSatoshi: number;
  btcPendingSatoshi: number;
  btcUtxoCount: number;
  inscriptionSatoshi: number;
  inscriptionPendingSatoshi: number;
  inscriptionUtxoCount: number;
}

export interface ChiselTx {
  txid: string;
  isConfirmed: boolean;
  isBroadcast: boolean;
}

export interface ChiselTxObject {
  txids: ChiselTx[];
}

export interface ChiselOrderResponse {
  id: string;
  destination: string;
  fee_rate: number;
  status: string;
  parent_inscription_id: string;
  parent_receptacle_address?: string;
  funding_address: string;
  service_fee: number;
  amount: number;
  size: number;
  expiration: number;
  transactionData?: ChiselTxObject;
}

export interface InscriptionTxResponse {
  txid: string;
  status: {
    confirmed: boolean;
    block_height: number;
    block_hash: string;
    block_time: number;
  };
}
export class CollectionsResponse {
  n0k: TokenObject[];
  ctrl: TokenObject[];
  kard: TokenObject[];
}
