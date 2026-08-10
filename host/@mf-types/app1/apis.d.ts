
    export type RemoteKeys = 'app1/styles' | 'app1/Order' | 'app1/Product';
    type PackageType<T> = T extends 'app1/Product' ? typeof import('app1/Product') :T extends 'app1/Order' ? typeof import('app1/Order') :T extends 'app1/styles' ? typeof import('app1/styles') :any;