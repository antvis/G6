// // export type OmittedStyle = 'r' | 'points';

// import type { Circle, DisplayObject } from '@antv/g';

// export type StyleProps<T extends new (...args: any[]) => any> = NonNullable<
//   NonNullable<ConstructorParameters<T>[0]>['style']
// >;

// export type StyleProps1<T extends DisplayObject> = NonNullable<
//   NonNullable<ConstructorParameters<ClassType<T>>[0]>['style']
// >;

// export type Constructor<T extends DisplayObject> = new (...args: any[]) => T;

// export type ClassType<T> = new (...args: any[]) => T;

// type A = StyleProps1<Circle>;

// type B = typeof Circle;

// type C = InstanceType<B>['attributes'];
