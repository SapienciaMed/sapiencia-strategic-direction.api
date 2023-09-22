declare module "@ioc:core.ComponentsProvider" {
    import { IComponentsService } from "App/Services/ComponentsService";

    const ComponentsProvider: IComponentsService;
    export default ComponentsProvider;
}
