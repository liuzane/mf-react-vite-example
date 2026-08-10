
    export type RemoteKeys = 'app2/styles' | 'app2/User' | 'app2/Role';
    type PackageType<T> = T extends 'app2/Role' ? typeof import('app2/Role') :T extends 'app2/User' ? typeof import('app2/User') :T extends 'app2/styles' ? typeof import('app2/styles') :any;