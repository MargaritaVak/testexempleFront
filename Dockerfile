FROM node:20-alpine

# Установите рабочую директорию внутри контейнера
WORKDIR /src/app

# Скопируйте package.json и package-lock.json (или yarn.lock) в контейнер
COPY package*.json ./

# Установите зависимости
RUN npm install


COPY . .

EXPOSE 4200


CMD ["npm", "start", "--host", "0.0.0.0"]
