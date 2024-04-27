# Users Management API

## Table of Content

1. [Create User](#create-user)
2. [Get All Users](#get-all-users)
3. [Get Detail User By ID](#get-detail-user-by-id)
4. [Update User](#update-user)
5. [Update Password](#update-password)
6. [Delete User](#delete-user)

### Create User

Membuat pengguna baru.

#### Endpoint

```
POST /api/v1/users/
```

#### Header

| Key           | Value                 |
| ------------- | --------------------- |
| Content-Type  | application/json      |
| Authorization | Bearer <access_token> |

#### Body

| Field            | Type   | Deskripsi                     |
| ---------------- | ------ | ----------------------------- |
| name             | string | Nama pengguna.                |
| username         | string | Username unik untuk pengguna. |
| email            | string | Alamat email pengguna.        |
| password         | string | Kata sandi pengguna.          |
| confirm_password | string | Konfirmasi kata sandi.        |

#### Contoh Body:

```json
{
  "name": "John Doe",
  "username": "johndoe123",
  "email": "johndoe@example.com",
  "password": "Password123"
}
```

#### Body Validation

| Field            | Type   | Required | Rule                                                  |
| ---------------- | ------ | -------- | ----------------------------------------------------- |
| name             | string | true     | Minimal: 3 karakter, maksimal: 100 karakter           |
|                  |        |          | Hanya boleh berisi huruf.                             |
| username         | string | true     | Minimal: 3 karakter, maksimal: 50 karakter,           |
|                  |        |          | Hanya boleh berisi huruf dan angka, diawali huruf.    |
| email            | string | true     | Format email, maksimal: 255 karakter.                 |
| password         | string | true     | Minimal: 6 karakter, maksimal: 255 karakter,          |
|                  |        |          | Harus mengandung huruf besar, huruf kecil, dan angka. |
| confirm_password | string | true     | Harus sama dengan kata sandi.                         |

#### Respons

**Status Code**: 201 Created

```json
{
  "code": 201,
  "message": "Data berhasil ditambahkan",
  "data": {
    "id": "123456",
    "username": "johndoe123",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "created_at": "2024-04-27T12:00:00Z"
  }
}
```

#### Kesalahan

- **400 Bad Request**:

  - Validation Error

  ```json
  {
    "status": false,
    "code": 400,
    "error": "Validation error",
    "data": [
      "Name harus memiliki panjang minimal 3 karakter.",
      "Username hanya boleh berisi huruf dan angka tanpa spasi.",
      "Email wajib diisi.",
      "Password harus mengandung setidaknya satu huruf kecil, satu huruf besar, satu angka."
    ]
  }
  ```

  - Email or Username Already Exists

  ```json
  {
    "status": false,
    "code": 400,
    "error": "Email telah terdaftar."
  }
  ```

- **401 Unauthorized & 403 Forbidden**

  - Auth Required

  ```json
  {
    "status": false,
    "code": 401,
    "error": "Authentication required"
  }
  ```

  - Access Denied

  ```json
  {
    "status": false,
    "code": 403,
    "error": "Authorization required"
  }
  ```

### Get All Users

Mengambil daftar semua pengguna.

#### Endpoint

```
GET /api/v1/users/
```

#### Header

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer <access_token> |

#### Query Parameters

| Parameter | Type   | Deskripsi                                                                       |
| --------- | ------ | ------------------------------------------------------------------------------- |
| limit     | number | (Opsional) Jumlah maksimal data yang akan ditampilkan per halaman. Default: 10. |
| page      | number | (Opsional) Halaman yang akan ditampilkan. Default: 1.                           |

#### Contoh Permintaan

```
GET /api/v1/users/?limit=10&page=1
```

#### Respons

**Status Code**: 200 OK

```json
{
  "status": true,
  "code": 200,
  "message": "Semua data berhasil diambil",
  "data": [
    {
      "id": "123456",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "created_at": "2024-04-27T12:00:00Z",
      "updated_at": "2024-04-27T12:00:00Z"
    },
    {
      "id": "678910",
      "name": "Jane Smith",
      "email": "janesmith@example.com",
      "created_at": "2024-04-28T12:00:00Z",
      "updated_at": "2024-04-28T12:00:00Z"
    }
  ],
  "meta": {
    "totalData": 2,
    "totalPage": 1,
    "page": 1,
    "limit": 10
  }
}
```

#### Kesalahan

- **404 Not Found**:

  - Data tidak ditemukan.

  ```json
  {
    "status": false,
    "code": 404,
    "error": "Pengguna tidak ditemukan."
  }
  ```

### Get Detail User By ID

Mengambil detail pengguna berdasarkan ID.

#### Endpoint

```
GET /api/v1/users/:id
```

#### Header

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer <access_token> |

#### Path Parameters

| Parameter | Type   | Deskripsi                          |
| --------- | ------ | ---------------------------------- |
| id        | string | ID pengguna yang akan ditampilkan. |

#### Contoh Permintaan

```
GET /api/v1/users/123456
```

#### Respons

**Status Code**: 200 OK

```json
{
  "status": true,
  "code": 200,
  "message": "Detail data berhasil diambil",
  "data": {
    "id": "123456",
    "name": "John Doe",
    "username": "johndoe123",
    "email": "johndoe@example.com",
    "role": "USER",
    "created_at": "2024-04-27T12:00:00Z",
    "updated_at": "2024-04-27T12:00:00Z"
  }
}
```

### Update User

Mengupdate informasi pengguna berdasarkan ID.

#### Endpoint

```
PATCH /api/v1/users/:id
```

#### Header

| Key           | Value                 |
| ------------- | --------------------- |
| Content-Type  | application/json      |
| Authorization | Bearer <access_token> |

#### Path Parameters

| Parameter | Type   | Deskripsi                       |
| --------- | ------ | ------------------------------- |
| id        | string | ID pengguna yang akan diupdate. |

#### Body

| Field    | Type   | Deskripsi              |
| -------- | ------ | ---------------------- |
| name     | string | Nama pengguna.         |
| username | string | Username pengguna.     |
| email    | string | Alamat email pengguna. |

#### Contoh Body

```json
{
  "name": "John Doe",
  "username": "johndoe123",
  "email": "johndoe@example.com"
}
```

#### Body Validation

| Field    | Type   | Required | Rule                                               |
| -------- | ------ | -------- | -------------------------------------------------- |
| name     | string | true     | Minimal: 3 karakter, maksimal: 100 karakter        |
|          |        |          | Hanya boleh berisi huruf.                          |
| username | string | true     | Minimal: 3 karakter, maksimal: 50 karakter,        |
|          |        |          | Hanya boleh berisi huruf dan angka, diawali huruf. |
| email    | string | true     | Format email, maksimal: 255 karakter.              |

#### Respons

**Status Code**: 200 OK

```json
{
  "status": true,
  "code": 200,
  "message": "Data berhasil diperbaharui",
  "data": {
    "id": "123456",
    "username": "johndoe123",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "updated_at": "2024-04-27T12:00:00Z"
  }
}
```

### Update Password

Mengupdate kata sandi pengguna berdasarkan ID.

#### Endpoint

```
PUT /api/v1/users/:id/password
```

#### Header

| Key           | Value                 |
| ------------- | --------------------- |
| Content-Type  | application/json      |
| Authorization | Bearer <access_token> |

#### Path Parameters

| Parameter | Type   | Deskripsi                       |
| --------- | ------ | ------------------------------- |
| id        | string | ID pengguna yang akan diupdate. |

#### Body

| Field            | Type   | Deskripsi                            |
| ---------------- | ------ | ------------------------------------ |
| old_password     | string | Kata sandi lama pengguna.            |
| password         | string | Kata sandi baru pengguna.            |
| confirm_password | string | Konfirmasi kata sandi baru pengguna. |

#### Contoh Body

```json
{
  "old_password": "OldPassword123",
  "password": "NewPassword123",
  "confirm_password": "NewPassword123"
}
```

#### Body Validation

| Field            | Type   | Required | Rule                                                                       |
| ---------------- | ------ | -------- | -------------------------------------------------------------------------- |
| old_password     | string | true     | Minimal: 6 karakter, harus mengandung huruf besar, huruf kecil, dan angka. |
| password         | string | true     | Minimal: 6 karakter, harus mengandung huruf besar, huruf kecil, dan angka. |
| confirm_password | string | true     | Harus sama dengan kata sandi baru.                                         |

#### Respons

**Status Code**: 200 OK

```json
{
  "status": true,
  "code": 200,
  "message": "Data berhasil diperbaharui",
  "data": {
    "id": "123456",
    "username": "johndoe123",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "updated_at": "2024-04-27T12:00:00Z"
  }
}
```

### Delete User

Menghapus pengguna berdasarkan ID.

#### Endpoint

```
DELETE /api/v1/users/:id
```

#### Header

| Key           | Value                 |
| ------------- | --------------------- |
| Authorization | Bearer <access_token> |

#### Path Parameters

| Parameter | Type   | Deskripsi                      |
| --------- | ------ | ------------------------------ |
| id        | string | ID pengguna yang akan dihapus. |

#### Respons

**Status Code**: 200 OK

```json
{
  "status": true,
  "code": 200,
  "message": "Data berhasil dihapus"
}
```
