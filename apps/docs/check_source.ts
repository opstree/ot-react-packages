import { source } from './src/lib/source';
console.log('Source imported:', source);
if (!source) {
    console.error('Source is undefined!');
    process.exit(1);
}
console.log('Source seems valid.');
