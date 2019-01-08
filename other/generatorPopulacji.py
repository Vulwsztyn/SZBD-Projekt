import random


class peselowacz:
    def __init__(self, num):
        self.n = num

    def getPesel(self):
        a = str(self.n)
        self.n += 1
        l = len(a)
        a = '0' * (11 - l) + a
        return a


def grupy():
    for i in ['I1', 'I2', 'I3', 'I4', 'I5', 'I6']:
        for j in range(1, 8):
            print(
                "insert into grupa_dziekanska(symbol,semestr_id) values('{0}', (select id from semestry where numer={1}));".format(
                    i, j))


def sale():
    lista = [
        "2 CW",
        "8 CW",
        "L053 BT",
        "lab. 1.6.16",
        "lab. 1.6.18",
        "lab. 1.6.21",
        "lab. 1.6.22",
        "lab. 1.6.23",
        "lab. 43",
        "lab. 44",
        "lab. 45",
        "lab. 143",
        "lab. 2.7.14",
        "lab. 2.7.15",
        "lab. 2.7.16",
        "lab. P6"
    ]
    for i in lista:
        print("insert into sale(nazwa) values(\'{0}\');".format(i))


def przedmioty():
    lista = [
        "Sieci komputerowe 2",
        "Systemy zarządzania bazami danych",
        "Wspomaganie decyzji",
        "Inżynieria Oprogramowania",
        "Komunikacja człowiek-komputer",
        "Sztuczna Inteligencja",
        "Systemy wbudowane",
    ]
    l2 = [
        5, 5, 5, 3, 3, 4, 5

    ]
    for i, v in enumerate(lista):
        print(
            "insert into przedmioty(nazwa,semestr_id,ects) values(\'{0}\',(select id from semestry where numer=5),{1});".format(
                v, l2[i]))


def zajecia():
    lista = [
        "Sieci komputerowe 2",
        "Systemy zarządzania bazami danych",
        "Wspomaganie decyzji",
        "Inżynieria Oprogramowania",
        "Komunikacja człowiek-komputer",
        "Sztuczna Inteligencja",
        "Systemy wbudowane",
    ]
    l2 = [
        "l", "w"
    ]
    for i in lista:
        for j in l2:
            print(
                "insert into zajecia(typ,przedmiot_id) values(\'{1}\',(select id from przedmioty where nazwa=\'{0}\'));".format(
                    i, j))


def prowadzacy():
    p = peselowacz(11111111111)
    lista = [
        ["Bartosz", "Zagrzeba", "dr inż."],
        ["Roman", "Słowiński", "prof. dr hab. inż."],
        ["Piotr", "Zielniewicz", "dr hab. inż."],
        ["Paweł", "Boiński", "dr inż."],
        ["Michał", "Tomczyk", "dr inż."],
        ["Jan", "Kończak", "dr inż."],
        ["Marcin", "Szeląg", "dr inż."],
        ["Mirosław", "Ochodek", "dr inż."],
        ["Ariel", "Antonowicz", "dr inż."],
        ["Michał", "Maćkowiak", "dr inż."],
        ["Agnieszka", "Ławrynowicz", "dr inż."],
        ["Bartosz", "Bębel", "dr inż."],
        ["Przemysław", "Zakrzewski", "dr inż."],
        ["Michał", "Kalewski", "dr inż."],
        ["Marek", "Wojciehowski", "dr inż."],
        ["Wojciech", "Complak", "dr inż."],
        ["Michał", "Boroń", "dr inż."],
        ["Artur", "Michalski", "dr inż."],
        ["Michal", "Sajkowski", "dr inż."],
        ["Miłosz", "Kadziński", "dr inż."],
        ["Irmina", "Masłowska", "dr inż."],
        ["Anna", "Leśniewska", "dr inż."],
        ["Jerzy", "Błaszczyński", "dr inż."],
        ["Tadeusz", "Morzy", "prof. dr hab. inż."],
        ["Tadeusz", "Koszlajda", "dr inż."],
        ["Paweł", "Liskowski", "dr inż."]
    ]
    l = [
        'ADMINISTRACJA',
        'SYSTEMY ROZPROSZONE', 'SYSTEMY EKSPERCKIE', 'ALGORYTMY', 'BADANIA OPERACYJNE']
    for i in lista:
        q = p.getPesel()
        print(
            "insert into osoby(imie,nazwisko,pesel,haslo,typ) values(\'{0}\',\'{1}\',\'{2}\',\'{3}\',\'{4}\');".format(
                i[0], i[1], q, i[1], "Teacher"))
        print(
            "insert into pracownicy(id,stopien,zespol_id) values({0},\'{1}\',{2});".format(
                "(select id from osoby where pesel=\'{0}\')".format(q), i[2],
                "(select id from zespoly where nazwa=\'{0}\')".format(random.choice(l))))


def zajecia_w_planie():
    lista = [
        "Sieci komputerowe 2",
        "Systemy zarządzania bazami danych",
        "Wspomaganie decyzji",
        "Inżynieria Oprogramowania",
        "Komunikacja człowiek-komputer",
        "Sztuczna Inteligencja",
        "Systemy wbudowane",
    ]
    lista = [
        [
            "Wspomaganie decyzji", "w", "Słowiński", "8 CW", 1, 2
        ],
        [
            "Komunikacja człowiek-komputer", "w", "Zielniewicz", "L053 BT", 1, 3
        ],
        [
            "Komunikacja człowiek-komputer", "l", "Tomczyk", "lab. 45", 2, 1
        ],
        [
            "Systemy wbudowane", "l", "Antonowicz", "lab. 2.7.14", 2, 2
        ],
        [
            "Sztuczna Inteligencja", "l", "Ławrynowicz", "lab. 43", 2, 4
        ],
        [
            "Inżynieria Oprogramowania", "l", "Maćkowiak", "lab. 43", 2, 5
        ],
        [
            "Sieci komputerowe 2", "l", "Boroń", "lab. 1.6.18", 3, 2
        ],
        [
            "Sztuczna Inteligencja", "w", "Michalski", "L053 BT", 3, 3
        ],
        [
            "Inżynieria Oprogramowania", "w", "Ochodek", "2 CW", 3, 4
        ],
        [
            "Sieci komputerowe 2", "w", "Sajkowski", "8 CW", 3, 5
        ],
        [
            "Wspomaganie decyzji", "l", "Masłowska", "lab. 43", 4, 1
        ],
        [
            "Systemy zarządzania bazami danych", "l", "Leśniewska", "lab. 1.6.22", 4, 2
        ],
        [
            "Systemy zarządzania bazami danych", "w", "Morzy", "8 CW", 4, 3
        ],
        [
            "Systemy wbudowane", "w", "Zakrzewski", "8 CW", 4, 5
        ]
    ]
    for i in lista:
        grupa = "(select id from grupy_dziekanskie where symbol='I1' and semestr_id=(select id from semestry where NUMER=5))"
        zaj = "(select id from zajecia where typ=\'{0}\' and przedmiot_id=(select id from przedmioty where nazwa=\'{" \
              "1}\'))".format(i[1], i[0])
        sal = "(select id from sale where nazwa=\'{0}\')".format(i[3])
        prac ="(select id from osoby where nazwisko=\'{0}\')".format(i[2])
        print(
            "insert into zajecia_w_planie(dzien_tygodnia,grupa_id,zajecia_id,godzina_id,pracownik_id,strona_grupy,sala) values({0},{1},{2},{3},{4},\'{5}\',{6});".format(
                i[4], grupa, zaj, i[5], prac, "lewa", sal))


if __name__ == '__main__':
    zajecia_w_planie()


