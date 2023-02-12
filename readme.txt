Название бд- docDb
user=user1
password=123
create user user1 with encrypted password '123' SUPERUSER;
backend port 8080
frontend port 4200

Для запуска фронта:
npm install -g serve
serve frontend -p 4200
https://github.com/svp8/docsSpringBoot