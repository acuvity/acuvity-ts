// This file has been autogenerated using elemental cli. 
// Use `npm run sync` to update from latest elemental specifications
 
import { Identity } from '../utils/const';
import { AlertEvent, AlertEventIdentity } from './AlertEvent';
import { Analyzer, AnalyzerIdentity } from './Analyzer';
import { AnalyzerModel, AnalyzerModelIdentity } from './AnalyzerModel';
import { Detector, DetectorIdentity } from './Detector';
import { Extraction, ExtractionIdentity } from './Extraction';
import { ExtractionRequest, ExtractionRequestIdentity } from './ExtractionRequest';
import { Latency, LatencyIdentity } from './Latency';
import { Modality, ModalityIdentity } from './Modality';
import { Principal, PrincipalIdentity } from './Principal';
import { PrincipalApp, PrincipalAppIdentity } from './PrincipalApp';
import { PrincipalUser, PrincipalUserIdentity } from './PrincipalUser';
import { Root, RootIdentity } from './Root';
import { ScanExternalUser, ScanExternalUserIdentity } from './ScanExternalUser';
import { ScanRequest, ScanRequestIdentity } from './ScanRequest';
import { ScanResponse, ScanResponseIdentity } from './ScanResponse';
import { TextualDetection, TextualDetectionIdentity } from './TextualDetection';

export type IdentityName = 'alertevent'
  | 'analyzer'
  | 'analyzermodel'
  | 'detector'
  | 'extraction'
  | 'extractionrequest'
  | 'latency'
  | 'modality'
  | 'principal'
  | 'principalapp'
  | 'principaluser'
  | 'root'
  | 'scanexternaluser'
  | 'scanrequest'
  | 'scanresponse'
  | 'textualdetection';

export const AllIdentities: Identity[] = [
  AlertEventIdentity,
  AnalyzerIdentity,
  AnalyzerModelIdentity,
  DetectorIdentity,
  ExtractionIdentity,
  ExtractionRequestIdentity,
  LatencyIdentity,
  ModalityIdentity,
  PrincipalIdentity,
  PrincipalAppIdentity,
  PrincipalUserIdentity,
  RootIdentity,
  ScanExternalUserIdentity,
  ScanRequestIdentity,
  ScanResponseIdentity,
  TextualDetectionIdentity,
];

export type IdentityNameToIdentifiable = {
  alertevent: AlertEvent,
  analyzer: Analyzer,
  analyzermodel: AnalyzerModel,
  detector: Detector,
  extraction: Extraction,
  extractionrequest: ExtractionRequest,
  latency: Latency,
  modality: Modality,
  principal: Principal,
  principalapp: PrincipalApp,
  principaluser: PrincipalUser,
  root: Root,
  scanexternaluser: ScanExternalUser,
  scanrequest: ScanRequest,
  scanresponse: ScanResponse,
  textualdetection: TextualDetection,
};