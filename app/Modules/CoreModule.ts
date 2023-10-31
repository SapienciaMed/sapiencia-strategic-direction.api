declare module "@ioc:core.CoreProvider" {
    import { ICoreService } from "App/Services/External/CoreService";

    const CoreProvider: ICoreService;
    export default CoreProvider;
}
