declare module "@ioc:core.ActionPlanProvider" {
    import { IPlanActionService } from "App/Services/ActionPlanService";
  
    const ActionPlanProvider: IPlanActionService;
    export default ActionPlanProvider;
  }
  