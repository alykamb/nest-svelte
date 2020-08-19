import svelte from 'rollup-plugin-svelte-hot';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import hmr from 'rollup-plugin-hot'
import copy from 'rollup-plugin-copy'

const production = process.env.NODE_ENV === 'production';

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'front:start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const hot = !production

export default {
	input: 'client/src/main.ts',
    output: {
        format: 'es',
        dir: 'dist/client/build/',
    },
	plugins: [
        copy({
            targets: [
                { src: 'client/public/**.*', dest: 'dist/client' }
            ]
        }),

		svelte({
            hot,
			// enable run-time checks when not in production
            dev: hot,
			// we'll extract any component CSS out into
			// a separate file - better for performance
			...(!hot && {
                css: (css) => {
                    css.write('dist/client/build/main.css', false);
                },        
        }),
			preprocess: sveltePreprocess(),
        }),

        
        
        hot && hmr({
            public: 'public',
            inMemory: true,

            // Default host for the HMR server is localhost, change this option if
            // you want to serve over the network
            // host: '0.0.0.0',
            // You can also change the default HMR server port, if you fancy
            // port: '12345'

            // This is needed, otherwise Terser (in npm run build) chokes
            // on import.meta. With this option, the plugin will replace
            // import.meta.hot in your code with module.hot, and will do
            // nothing else.
            compatModuleHot: !hot,
        }),

        scss({
            output: 'dist/client/build/global.css',
            watch: 'client/src/styles',
            
        }),
		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({ sourceMap: !production, tsconfig: './client/tsconfig.json' }),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
