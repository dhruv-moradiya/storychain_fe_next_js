import { SR_LABELS, SUBMIT_REQUEST_TYPE } from './submit-request.enum';

type TSubmitRequestType = (typeof SUBMIT_REQUEST_TYPE)[number];

type TSubmitRequestLabel = (typeof SR_LABELS)[number];

export type { TSubmitRequestType, TSubmitRequestLabel };
