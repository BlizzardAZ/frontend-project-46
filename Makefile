install: # установка зависимостей	
	npm ci	
	
gendiff: # выполнение файла gendiff.js		
	node bin/gendiff.js
	
publish: # сбор архива для публикации в тестовом режиме
	npm publish --dry-run

lint: # запуск npx eslint	
	npx eslint .	

lintfix: # запуск npx eslint с флагом --fix
	npx eslint --fix .

test: # запуск тестов
	npm test

# jest: # запуск jest-теститрования NODE_OPTIONS=--experimental-vm-modules npx jest