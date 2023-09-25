declare module "@ioc:core.ActivityProvider" {
    import { IActivityService } from "App/Services/ActivityService";

    const ActivityProvider: IActivityService;
    export default ActivityProvider;
}
