# Full code origin dev mỗi ngày trước khi code...!
<<<<<<< HEAD
```
git pull origin dev
```
*Pull code mỗi ngày để tránh conflix nhiều file. đẫn đến việc fix conflix mất code của người khác*
### Nếu có file đang sửa dở thì hãy discard change hoặc stash lại (đọc thêm về git stash [git stash](https://viblo.asia/p/nhan-hon-cung-git-stash-07LKXM8JZV4)

# Các bước khi tạo pull request
**Bước 1: Chuẩn bị**
*Format tất cả các file mình đã sửa hoặc chạy command format, lint( chỉ để lại lỗi any và lỗi defined nhưng không dùng )*
```
npm run lint
npm run format
```
**Bước 2: push code**
*Commit và push lên nhanh của mình*
```
git commit -m "bla bla"
git push 
```
**Bước 3: github**
*1. Vào github và tạo pull request ở phần Pull request -> New pull request*
*2. lưu ý: ở phần compare chọn base: dev <= compare: user_name ( VD: base: dev <= compare: giangnh )*
**Bước 4: assign**
*1. title: để tile là shortcut nội dung mình sửa và làm nhưng gì, nếu dài có thể viết dưới phần write*
*2. chọn asign: tutatj84 (FE)*
*asign: gianghoang9912 (BE)*
**Bước 5: tạo pull request**
*Kiểm tra file thay đổi có đúng cái mình sửa không có thừa file hay thiếu file không => Create pull request*

=======
```
git pull origin dev
```
*Pull code mỗi ngày để tránh conflix nhiều file. đẫn đến việc fix conflix mất code của người khác*
### Nếu có file đang sửa dở thì hãy discard change hoặc stash lại (đọc thêm về git stash [git stash](https://viblo.asia/p/nhan-hon-cung-git-stash-07LKXM8JZV4)

# Các bước khi tạo pull request
**Bước 1: Chuẩn bị**
*Format tất cả các file mình đã sửa hoặc chạy command format, lint( chỉ để lại lỗi any và lỗi defined nhưng không dùng )*
```
npm run lint
npm run format
```

**Bước 2: push code**

*Commit và push lên nhanh của mình*
```
git commit -m "bla bla"
git push 
```

**Bước 3: github**

*1. Vào github và tạo pull request ở phần Pull request -> New pull request*
*2. lưu ý: ở phần compare chọn base: dev <= compare: user_name ( VD: base: dev <= compare: giangnh )*

**Bước 4: assign**

*1. title: để tile là shortcut nội dung mình sửa và làm nhưng gì, nếu dài có thể viết dưới phần write*
*2. chọn asign: tutatj84 (FE)*
*asign: gianghoang9912 (BE)*

**Bước 5: tạo pull request**

*Kiểm tra file thay đổi có đúng cái mình sửa không có thừa file hay thiếu file không => Create pull request*

>>>>>>> 147ffc3e59ac2b135fa523768d2f28becd3f9bb4
### - Nếu có css hay code nào dùng chung được thì tách và gọi chung cho đồng bộ code

### Run front-end
```
npm run start

yarn start
```
### Lint auto fix
```
npm run lint:fix
```
