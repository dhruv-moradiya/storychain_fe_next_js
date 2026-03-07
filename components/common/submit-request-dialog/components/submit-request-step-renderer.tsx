import { AnimatePresence } from 'framer-motion';
import {
  SubmitRequestDialogContextData,
  SubmitRequestStepConfig,
} from '../types/submit-request-dialog.types';

interface SubmitRequestStepRendererProps {
  step: SubmitRequestStepConfig;
  context: SubmitRequestDialogContextData;
  hasContext: boolean;
}

export function SubmitRequestStepRenderer({
  step,
  context,
  hasContext,
}: SubmitRequestStepRendererProps) {
  const StepComponent = step.component;

  return (
    <AnimatePresence mode="wait">
      <StepComponent context={context} hasContext={hasContext} />
    </AnimatePresence>
  );
}
