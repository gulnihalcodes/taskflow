# TaskFlow

TaskFlow, ekiplerin harcama kontrolü gibi işlerini görevlere ayırıp sorumlu, durum ve öncelik bilgisiyle takip edebildiği bir Node.js ve Express REST API’sidir. Örnek görev, Kasım ayındaki fişleri ve abonelik ödemelerini gözden geçirmektir.

## Windows’ta çalıştırma

1. Node.js ve npm kurulumunu PowerShell’de `node -v` ve `npm.cmd -v` ile kontrol et.
2. VS Code’da `package.json` dosyasının bulunduğu proje klasörünü aç.
3. Proje klasöründeki terminalde aşağıdaki komutları sırayla çalıştır.

```powershell
npm.cmd install
node app.js
```

Terminalde `TaskFlow çalışıyor` mesajı çıkınca tarayıcıda `http://127.0.0.1:3000/tasks` adresini aç. Sunucu açıkken istekleri yöntem, adres ve UTC zaman damgasıyla terminale yazar.

Görevler bellekte tutulur. Sunucu tekrar başladığında başlangıçtaki örnek kayıt yüklenir.

## API uçları

| Yöntem | Adres | İşlem | Başarı kodu |
| --- | --- | --- | --- |
| GET | `/tasks` | Bütün görevleri listele | 200 |
| GET | `/tasks/:id` | Bir görevin detayını getir | 200 |
| POST | `/tasks` | Yeni görev ekle | 201 |
| PATCH | `/tasks/:id` | Gönderilen alanları güncelle | 200 |
| DELETE | `/tasks/:id` | Görevi sil | 200 |

Her görevde `id`, `title`, `description`, `assignee`, `status` ve `priority` bulunur. Yeni kayıtta başlık zorunludur. Sunucu numarayı üretir ve ilk durumu `pending` olarak belirler. Geçersiz alanlar 400, bulunamayan görevler 404 yanıtı alır.

## Postman testleri

1. Sunucuyu açık tut ve `TaskFlow.postman_collection.json` dosyasını Postman’e aktar.
2. **TaskFlow - CRUD Testleri** koleksiyonundaki beş isteği sırayla açıp her biri için **Send** düğmesine bas.
3. İlk istek görev numarasını koleksiyona kaydeder. Detay, güncelleme ve silme istekleri bu numarayı kullanır.
4. Her başarılı istekte yöntem, adres, HTTP sonucu ve yanıt gövdesi görünürken ekran görüntüsü al. Görselleri aşağıdaki dosya adlarıyla kaydet.

| Sıra | İstek | Beklenen sonuç | Görsel adı |
| --- | --- | --- | --- |
| 1 | Görev ekle | 201 Created ve yeni görev numarası | `01_Ekle.png` |
| 2 | Görevleri listele | 200 OK ve yeni görevin listede görünmesi | `02_Liste.png` |
| 3 | Görev detayı | 200 OK ve tek görevin dönmesi | `03_Detay.png` |
| 4 | Görevi güncelle | 200 OK ve `status` alanında `completed` | `04_Guncelle.png` |
| 5 | Görevi sil | 200 OK ve `Görev silindi.` mesajı | `05_Sil.png` |

## Teslim dosyaları

Tek herkese açık GitHub reposunda kaynak kodu, README’yi, `TaskFlow_Proje_Tanitimi.pdf` ve `TaskFlow_Kurulum_Notu.pdf` belgelerini ve beş Postman ekran görüntüsünü bulundur. Formdaki ilgili alanlara iki PDF’yi, test görüntülerini ve GitHub bağlantısını ekle.
