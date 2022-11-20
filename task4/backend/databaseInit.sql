create table category
(
    id            int auto_increment primary key,
    category_code varchar(256) not null unique,
    name          varchar(256) null
);

create table order_status
(
    id   int auto_increment primary key,
    code varchar(256) not null unique,
    name varchar(256) not null
);

create table order_entity
(
    id              int auto_increment primary key,
    creation_date   datetime     null default NOW(),
    user_name       varchar(256) not null,
    email           varchar(256) not null,
    phone           varchar(256) null,
    order_status_id int          not null,
    foreign key (order_status_id) references order_status (id)
);

create table product
(
    id          int auto_increment primary key,
    sku         varchar(256) not null unique,
    name        varchar(256) not null,
    description text         not null,
    unit_price  float        not null,
    unit_weight float        not null,
    category_id int          not null,
    foreign key (category_id) references category (id)
);

create table order_items
(
    id         int auto_increment primary key,
    order_id   int not null,
    product_id int not null,
    quantity   int not null,
    foreign key (product_id) references product (id),
    foreign key (order_id) references order_entity (id)
);

# Sample data

INSERT INTO final_application.category (category_code, name)
VALUES ('graphic_cards', 'Karty graficzne');
INSERT INTO final_application.category (category_code, name)
VALUES ('procesors', 'Procesory');
INSERT INTO final_application.category (category_code, name)
VALUES ('motherboards', 'Płyty główne');
INSERT INTO final_application.category (category_code, name)
VALUES ('ram_memory', 'Pamięci ram');
INSERT INTO final_application.category (category_code, name)
VALUES ('power_supplies', 'Zasilacze');
INSERT INTO final_application.category (category_code, name)
VALUES ('disks', 'Dyski');
INSERT INTO final_application.category (category_code, name)
VALUES ('cases', 'Obudowy');
INSERT INTO final_application.order_status (code, name)
VALUES ('not_approved', 'NIEZATWIERDZONE');
INSERT INTO final_application.order_status (code, name)
VALUES ('approved', 'ZATWIERDZONE');
INSERT INTO final_application.order_status (code, name)
VALUES ('canceled', 'ANULOWANE');
INSERT INTO final_application.order_status (code, name)
VALUES ('completed', 'ZREALIZOWANE');
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id)
VALUES ('rtx-3060', 'Karta graficzna GeForce RTX 3060',
        'Karta graficzna RTX 3060 jest wyposażona w jeden z najpopularniejszych chipów marki Nvidia. Dzięki swojej przemyślanej konstrukcji będącej efektem kilku dekad rozwoju i innowacji zapewnia ona potężną moc obliczeniową. Szereg nowoczesnych rozwiązań sprzętowych oraz programowych pozwala jeszcze bardziej zwiększyć wydajność, a także oddaje w Twoje ręce wyspecjalizowane narzędzie ułatwiające wykonanie codziennych zadań.',
        1999, 0.584, 1);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id)
VALUES ('rtx-3070', 'Karta graficzna GeForce RTX 3070',
        'RTX 3070 jest zasilany przez Ampere — architekturę RTX drugiej generacji firmy NVIDIA. Zbudowany z ulepszonymi rdzeniami RT i Tensor Core',
        3299, 0.832, 1);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id)
VALUES ('rtx-3080', 'Karta graficzna GeForce RTX 3080',
        'Karta graficzna RTX 3080 to lider wśród gamingowych sprzętów tego typu. Bazuje na przyspieszonym układzie graficznym, dysponuje pojemną i szybką pamięcią. Już pierwsze testy udowodniły, że mamy do czynienia z bardzo dobrej jakości produktem. Karta doskonale radzi sobie z technologią Ray Tracing, zbyt skomplikowaną dla większości konkurentów.
Ray Tracing (ang. śledzenie promieni) to prawdziwa rewolucja w świecie gier komputerowych. To dzięki niej widzisz w grze hiperrealistyczne efekty świetlne. Zaawansowane algorytmy bez trudu rozpoznają źródła światła, a cienie i odbicia renderują się w czasie rzeczywistym. W efekcie animacje w bestsellerowych produkcjach mają jeszcze lepszą jakość!
Jest tylko jedno „ale” – Ray Tracing mocno spowalnia działanie gier, ale nie wtedy, gdy korzystasz z karty GeForce RTX 3080. Tutaj wszystko działa płynnie i poprawnie. Dzieje się tak z dwóch powodów. Po pierwsze, dzięki zaawansowanym możliwościom serii RTX. Po drugie, z racji udostępnionej przez NVIDIA techniki DLSS. Ta ostatnia w imponujący sposób przyspiesza renderowanie. Nie tylko zwiększa częstotliwość generowania klatek, ale również zachowuje najwyższą jakość obrazu, nawet kiedy używasz gier zaawansowanych graficznie.',
        5399, 1.565, 1);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('i5-11600k', 'Procesor Intel Core i5-11600K', 'Potrzebujesz wydajnego procesora, który jednocześnie jest idealny do gamingu i do pracy? Chcesz, aby Twój komputer bardzo dobrze funkcjonował nawet przy maksymalnym obciążeniu? W takim wypadku Intel Core i5-11600K został stworzony dla Ciebie. Zaprojektowany został w taki sposób, aby zapewnić komfort użytkowania każdemu graczowi i osobom wykorzystującym komputer do wykonywania codziennych czynności. Ciesz się niezwykłą wydajnością oraz mocą niezależnie od tego, co robisz przy swoim stanowisku.
Procesor składa się z 6 solidnych rdzeni oraz 12 wątków logicznych, dzięki którym częstotliwość taktowania osiąga bazową wartość 3.9 GHz. Możesz zapomnieć o spadku liczby klatek na sekundę oraz długim buforowaniu. A jeżeli to dla Ciebie nadal zbyt mało, procesor wyposażony został w technologię Intel Turbo Frequency, która daje możliwość podkręcenia częstotliwości taktowania do 4900 MHz.', 1299, 0.35, 2);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('i7-11700k', 'Procesor Intel Core i7-11700K', 'Procesor to jeden z najważniejszych elementów urządzeń, takich jak komputer PC, tablet czy smartfon. Odgrywa rolę mózgu koordynującego pracę wszystkich innych podzespołów. Odpowiada za przeprowadzenie oraz działanie wszelkiego rodzaju procesów. Chcąc dostosować sprzęt do indywidualnych potrzeb, bardzo ważne jest wybranie odpowiedniego modelu.
Jedną z najatrakcyjniejszych propozycji jest procesor i7-11700K BX8070811700K wyróżniający się doskonałą mocą, szybkością i optymalnymi parametrami. Jest kompatybilny z najnowocześniejszym wyposażeniem i technologiami, co pozwala osiągnąć najwyższej jakości sprzęt. Model jest najlepszym rozwiązaniem dla wymagających użytkowników, którzy cenią sobie szybkość i płynność działania. ', 1799, 0.35, 2);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('i9-11900k', 'Procesor Intel Core i9-11900K', 'Procesor Intel Core i9-11900K to prawdziwy przełom w tego typu urządzeniach dzięki nowej architekturze Rocket Lake. Zastosowano w nim 8 rdzeni głównych, a także 16 wątków logicznych wspomagających pracę procesora. Pojedynczy rdzeń taktowany jest zegarem o częstotliwości 3.5 GHz, który jest w zupełności wystarczający do osiągnięcia najwyższej wydajności w grach i zastosowaniach profesjonalnych. To umożliwia nie tylko komfortowe granie, ale także i streamowanie oraz nagrywanie rozgrywki, którą można następnie udostępnić na jednej z platform.
Dzięki automatycznemu podniesieniu częstotliwości taktowania do wartości nawet 5.3 GHz masz pewność, że podczas pracy czy rozgrywki nigdy nie zabraknie Ci mocy i zawsze będziesz zadowolony z osiągów swojego procesora. W obsłudze często używanych programów pomoże Ci także 16 MB pamięci podręcznej Intel® Smart Cache.', 2227.96, 0.4, 2);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('msi-z490-a_pro', 'Płyta główna MSI Z490-A PRO', 'Seria PRO pomaga użytkownikom pracować sprytniej, zapewniając wydajne i produktywne doświadczenia. Dzięki stabilnej funkcjonalności i wysokiej jakości montażu, płyty główne z serii PRO zapewniają nie tylko zoptymalizowaną, profesjonalną pracę, ale także minimalizują liczbę mogących się pojawić problemów i oferują znacznie dłuższą żywotność.', 499, 0.6, 3);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('gigabyte-b560', 'Płyta główna Gigabyte B560', 'Czystsze i bardziej wydajne dostarczanie energii do procesora z lepszą wydajnością termiczną zapewnia stabilność przy wysokich częstotliwościach procesora i dużym obciążeniu.
Cyfrowy kontroler PWM dostarczający odpowiednie napięcie do procesora.
Bezpośrednie tranzystory MOSFET 6+2 fazy o niskim RDS(on) bez podwajaczy PWM, każda faza zasilania jest podłączona bezpośrednio do procesora.
Całkowicie solidne kondensatory w celu poprawy odpowiedzi przejściowej i zminimalizowania oscylacji.
8-pinowe, solidne złącze zasilania procesora.', 489, 0.56, 3);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('biostar-z490-a', 'Płyta główna Biostar Z490A', 'Dzięki chipsetowi Intel® Z490 i procesorom Intel® Core™ 10. generacji natychmiast znajdziesz się na czele pola bitwy, napędzany oszałamiającą mocą i wydajnością. Od tworzenia treści po gry, chipset Intel Z490 zapewnia moc i wydajność, których potrzebujesz.', 832.49, 0.74, 3);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('ram-8gb', 'Pamięć RAM 8 GB', 'Pamięć RAM 8 GB 1 kość.', 149.99, 0.2, 4);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('ram-16gb', 'Pamięć RAM 16 GB', 'Pamięć RAM 16 GB 2 kości.', 249.99, 0.35, 4);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('ram-32gb', 'Pamięć RAM 32 GB', 'Pamięć RAM 32 GB 2 kości.', 499.99, 0.4, 4);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('power-supply-500W', 'Zasilacz 500W', 'Zasilacz 500 W 80 Plus Bronze', 219.99, 0.9, 5);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('power-supply-750W', 'Zasilacz 750W', 'Zasilacz 750W 80 Plus Gold', 499.99, 1.25, 5);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('power-supply-1000W', 'Zasilacz 1000W', 'Zasilacz 1000W 80 Plus Platinium', 799.99, 1.52, 5);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('hdd-1tb-disk', 'Dysk HDD 1 TB', 'Dysk HDD 1 TB 72000 obr/min', 99.99, 0.512, 6);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('ssd-256gb-disk', 'Dysk SSD 256 GB', 'Dysk SSD 256 GB', 125, 0.256, 6);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('ssd-512gb-disk', 'Dysk SSD 512 GB', 'Dysk SSD 512 GB', 249, 0.342, 6);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('mini-tower-case', 'Obudowa Mini Tower', 'Wykorzystuje wszystkie funkcje obudowy ATX z podstawową wydajnością i wykorzystuje je efektywnie na mniej niż połowie objętości. Wszystkie funkcje zostały starannie zaprojektowane w 18-litrowej obudowie', 369, 5.1, 7);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('micro-tower-case', 'Obudowa Micro Tower', 'Obudowa jest tak skonstruowana, aby zaraz po wyjęciu z pudełka zadowoliła jakością i dużym potencjałem chłodzenia. Główne wyróżnienia obejmują wentylowany panel przedni i jeden z naszych dynamicznych wentylatorów PWM o mocy 180 x 38 mm w celu uzyskania maksymalnego chłodzenia powietrza przy zachowaniu kontrolowanego poziomu hałasu.', 599, 5.5, 7);
INSERT INTO final_application.product (sku, name, description, unit_price, unit_weight, category_id) VALUES ('full-tower-case', 'Obudowa Full Tower', 'Otwarta wentylacja i wiele wsporników wentylatorów zapewnia przepływ powietrza tam', 1309, 14.39, 7);
