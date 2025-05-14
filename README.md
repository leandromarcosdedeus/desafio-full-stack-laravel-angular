# Desafio Full Stack - Laravel + Angular

Este repositório contém uma aplicação full stack com **Laravel (backend)** e **Angular (frontend)**.

### Requisitos Globais

- PHP = 7.0
- Composer = 2.2
- Laravel = 5.4
- Node.js >= 18.7
- Angular = 17
- MySQL ou outro banco compatível

---

## 🔧 Instalação

### 1. Clone o projeto

```bash
git clone https://github.com/leandromarcosdedeus/desafio-full-stack-laravel-angular.git
cd desafio-full-stack-laravel-angular
```

---

## Backend (Laravel)

### 2. Acesse o diretório do backend

```bash
cd backend
```

### 3. Instale as dependências PHP

```bash
composer install
```

### 4. Copie o arquivo `.env` e configure

```bash
cp .env.example .env
```

Altere as variáveis de conexão com o banco, como:

```dotenv
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nome_do_banco
DB_USERNAME=usuario
DB_PASSWORD=senha
```

### 5. Gere a chave da aplicação

```bash
php artisan key:generate
```

### 6. Execute as migrations

```bash
php artisan migrate --seed
```

### 7. Inicie o servidor

```bash
php artisan serve
```

---

## 🌐 Frontend (Angular)

### 8. Acesse o diretório do frontend

```bash
cd ../frontend
```

### 9. Instale as dependências

```bash
npm install
```

### 9.1 Caso ocorra erro dependências

```bash
Para instalar ignorando conflitos de pacotes

npm install --legacy-peer-deps
```

### 10. Rode a aplicação Angular

```bash
ng serve
```

Acesse no navegador: [http://localhost:4200](http://localhost:4200)

---

### 11. Usuário e Senha

Faça login utilizado um dos seguintes usuarios:

                'email' => 'admin@example.com',
                'password' => 'password123', 

                'email' => 'joao@example.com',
                'password' => 'senha123'
---

