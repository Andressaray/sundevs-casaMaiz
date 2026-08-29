import { ContextResponse } from "../types/boostrap"

export interface HomeStore {
    boostrap: null | ContextResponse
    setBoostrap: (boostrap: ContextResponse) => void;
}