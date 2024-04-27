# Authentication API

## Table of Content

1. [Register User](#register-user)
2. [Login User](#login-user)

---

### Register User

Mendaftarkan pengguna baru.

#### Endpoint

```
POST /api/v1/auth/register
```

#### Header

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

| Field            | Type   | Deskripsi                     |
| ---------------- | ------ | ----------------------------- |
| name             | string | Nama pengguna.                |
| username         | string | Username unik untuk pengguna. |
| email            | string | Alamat email pengguna.        |
| password         | string | Kata sandi pengguna.          |
| confirm_password | string | Konfirmasi kata sandi.        |

#### Contoh Body

```json
{
  "name": "John Doe",
  "username": "johndoe123",
  "email": "johndoe@example.com",
  "password": "Password123",
  "confirm_password": "Password123"
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
  "status": true,
  "code": 201,
  "message": "Pengguna berhasil melakukan pendaftaran",
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlOWVlNzcwLWYzMjItNDU5Mi1hZjVkLWNkYzU0NDBjNTA0MiIsIm5hbWUiOiJKZWZyZW4gUmVwcGkiLCJ1c2VybmFtZSI6ImplZnJlbnJlcHBpIiwiZW1haWwiOiJqZWZyZW5yZXBwaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDVGU4NkIxZEVSUWlmSFJxdURvVEZ1NVk3LjdoUlNuMFUuN3JDd1RwT0tNM1JGRFNNYndPeSIsInJvbGUiOiJVU0VSIiwibGFzdF9sb2dpbiI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMDAwWiIsInJlZnJlc2hfdG9rZW4iOiIkMmIkMTAkeXdCOU9VR1JCdnNXVjU2ejlXUnlCZUxXazBXWVJub3RVL1Y2eUp2SDc5VHBNamE0cVZPcHUiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yN1QwNzowMzo1Mi40MTlaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMTU1WiIsImlhdCI6MTcxNDIxNzg2NCwiZXhwIjoxNzE0MjYxMDY0fQ.KPjRFCYb5bt4Nu_gfT59j1mMVzWhDL3oGdVvVCqE1Q0vVXeKfryOA82jiWSaiiDAHdovUb9Fn3o8IWCPM8p6MHVH1zXm2tHatWhF03JxG7E1_862EvXbw2FjrVJaAbLM_P7q2kUpyeYja1js8fJymiRs-NoQYWU15waEjlC6mjOi8tIKHM_PbFnLA3LpiE9ldmMEod_0uS0pol8NNTNlSByARVSOjZfGFM3AkU81evb-LCFB34GWWq7JMlMnlyXyO4bOY4tU7eZ0tB34PBlmd1MEdtpCd0yCjsw__XdJKJjsYgrG93gIrQotYwd6hj3taDJCSISuOAjbgf5n0MyOgQ",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlOWVlNzcwLWYzMjItNDU5Mi1hZjVkLWNkYzU0NDBjNTA0MiIsIm5hbWUiOiJKZWZyZW4gUmVwcGkiLCJ1c2VybmFtZSI6ImplZnJlbnJlcHBpIiwiZW1haWwiOiJqZWZyZW5yZXBwaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDVGU4NkIxZEVSUWlmSFJxdURvVEZ1NVk3LjdoUlNuMFUuN3JDd1RwT0tNM1JGRFNNYndPeSIsInJvbGUiOiJVU0VSIiwibGFzdF9sb2dpbiI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMDAwWiIsInJlZnJlc2hfdG9rZW4iOiIkMmIkMTAkeXdCOU9VR1JCdnNXVjU2ejlXUnlCZUxXazBXWVJub3RVL1Y2eUp2SDc5VHBNamE0cVZPcHUiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yN1QwNzowMzo1Mi40MTlaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMTU1WiIsImlhdCI6MTcxNDIxNzg2NCwiZXhwIjoxNzE0NDc3MDY0fQ.a9eOP9_xzgkg2A4onkwRZ86Dw15sIEllFoOmvvnoKNxUw9wjWZLt1AWx8FElFyJTucs0f0zFYPUiKDNxHKzBqabVTh2ElmQbk1t1aEHDiF443jIPbmDgh1xFuaxrLS0RSKSS4-12Wn_-pUj51Bxhs6NS5SL0Dr3pLo2WdPgrFq2ykk8cVz_NB0YUCFSWLNiYtt2Yn2gXZ0CYQzzmBGsubxdhvS-VziERl4kD-ufMx2ka-eveUxmvG8bzM5uA-07wVI_a46pDFD4dGQozhDSB4H51EICk0Wju0E3wc2dZmPoiFPANwbNL4znlmLe8Y2cXN0Ya1kHrbchKUnErlMXA3A"
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

---

### Login User

Mengotentikasi pengguna untuk masuk ke dalam aplikasi.

#### Endpoint

```
POST /api/v1/auth/login
```

#### Header

| Key          | Value            |
| ------------ | ---------------- |
| Content-Type | application/json |

#### Body

| Field    | Type   | Deskripsi              |
| -------- | ------ | ---------------------- |
| email    | string | Alamat email pengguna. |
| password | string | Kata sandi pengguna.   |

#### Contoh Body

```json
{
  "email": "johndoe@example.com",
  "password": "Password123"
}
```

#### Body Validation

| Field    | Type   | Required | Rule                                                  |
| -------- | ------ | -------- | ----------------------------------------------------- |
| email    | string | true     | Format email, maksimal: 255 karakter.                 |
| password | string | true     | Minimal: 6 karakter, maksimal: 255 karakter,          |
|          |        |          | Harus mengandung huruf besar, huruf kecil, dan angka. |

#### Respons

**Status Code**: 200 OK

```json
{
  "status": true,
  "code": 200,
  "message": "Pengguna berhasil masuk ke aplikasi",
  "data": {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlOWVlNzcwLWYzMjItNDU5Mi1hZjVkLWNkYzU0NDBjNTA0MiIsIm5hbWUiOiJKZWZyZW4gUmVwcGkiLCJ1c2VybmFtZSI6ImplZnJlbnJlcHBpIiwiZW1haWwiOiJqZWZyZW5yZXBwaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDVGU4NkIxZEVSUWlmSFJxdURvVEZ1NVk3LjdoUlNuMFUuN3JDd1RwT0tNM1JGRFNNYndPeSIsInJvbGUiOiJVU0VSIiwibGFzdF9sb2dpbiI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMDAwWiIsInJlZnJlc2hfdG9rZW4iOiIkMmIkMTAkeXdCOU9VR1JCdnNXVjU2ejlXUnlCZUxXazBXWVJub3RVL1Y2eUp2SDc5VHBNamE0cVZPcHUiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yN1QwNzowMzo1Mi40MTlaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMTU1WiIsImlhdCI6MTcxNDIxNzg2NCwiZXhwIjoxNzE0MjYxMDY0fQ.KPjRFCYb5bt4Nu_gfT59j1mMVzWhDL3oGdVvVCqE1Q0vVXeKfryOA82jiWSaiiDAHdovUb9Fn3o8IWCPM8p6MHVH1zXm2tHatWhF03JxG7E1_862EvXbw2FjrVJaAbLM_P7q2kUpyeYja1js8fJymiRs-NoQYWU15waEjlC6mjOi8tIKHM_PbFnLA3LpiE9ldmMEod_0uS0pol8NNTNlSByARVSOjZfGFM3AkU81evb-LCFB34GWWq7JMlMnlyXyO4bOY4tU7eZ0tB34PBlmd1MEdtpCd0yCjsw__XdJKJjsYgrG93gIrQotYwd6hj3taDJCSISuOAjbgf5n0MyOgQ",
    "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlOWVlNzcwLWYzMjItNDU5Mi1hZjVkLWNkYzU0NDBjNTA0MiIsIm5hbWUiOiJKZWZyZW4gUmVwcGkiLCJ1c2VybmFtZSI6ImplZnJlbnJlcHBpIiwiZW1haWwiOiJqZWZyZW5yZXBwaUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRDVGU4NkIxZEVSUWlmSFJxdURvVEZ1NVk3LjdoUlNuMFUuN3JDd1RwT0tNM1JGRFNNYndPeSIsInJvbGUiOiJVU0VSIiwibGFzdF9sb2dpbiI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMDAwWiIsInJlZnJlc2hfdG9rZW4iOiIkMmIkMTAkeXdCOU9VR1JCdnNXVjU2ejlXUnlCZUxXazBXWVJub3RVL1Y2eUp2SDc5VHBNamE0cVZPcHUiLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0yN1QwNzowMzo1Mi40MTlaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMjdUMTA6Mjg6MzguMTU1WiIsImlhdCI6MTcxNDIxNzg2NCwiZXhwIjoxNzE0NDc3MDY0fQ.a9eOP9_xzgkg2A4onkwRZ86Dw15sIEllFoOmvvnoKNxUw9wjWZLt1AWx8FElFyJTucs0f0zFYPUiKDNxHKzBqabVTh2ElmQbk1t1aEHDiF443jIPbmDgh1xFuaxrLS0RSKSS4-12Wn_-pUj51Bxhs6NS5SL0Dr3pLo2WdPgrFq2ykk8cVz_NB0YUCFSWLNiYtt2Yn2gXZ0CYQzzmBGsubxdhvS-VziERl4kD-ufMx2ka-eveUxmvG8bzM5uA-07wVI_a46pDFD4dGQozhDSB4H51EICk0Wju0E3wc2dZmPoiFPANwbNL4znlmLe8Y2cXN0Ya1kHrbchKUnErlMXA3A"
  }
}
```

#### Kesalahan

- **400 Bad Request**:

  - Invalid Email or Password

  ```json
  {
    "status": false,
    "code": 400,
    "error": "Email atau Password salah"
  }
  ```
