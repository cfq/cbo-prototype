from datetime import date, datetime, timedelta
import random
import json

offices = [
    "Brown Beer Nixon Mallon",
    "David Gray Solicitors LLP",
    "DWF",
    "Geoffrey Forrester & Co",
    "Hay & Kilner",
    "Kenneth M Barrow & Co",
    "McKeag & Co",
    "Pearson Caulfield",
    "Short Richardson & Forth LLP",
    "Slater & Gordon",
    "Tilly Bailey & Irvine",
    "Ward Hadaway",
]

advocates = [
    "Adrian Stanley",
    "Andrew Davison",
    "Andrew Facer",
    "Andy Hutchinson",
    "Bob Vickery",
    "Caroline Humphrys",
    "Chris Dawson",
    "Christopher Welch",
    "Colin Hewitt",
    "Craig Hutchinson",
    "David Bradshaw",
    "David Rewcastle",
    "David Richardson",
    "David Weatherburn",
    "Debbie Owens",
    "George Lyall",
    "Gillian Hall",
    "Glenn Calvert",
    "Guy Mills",
    "Helen Ager",
    "Hugh Welch",
    "Ian Collinson",
    "Ian Ward",
    "Jamie Pass",
    "Jane Gibson",
    "Jeremy Smith",
    "Joanne Major",
    "John Davis",
    "John Ralph",
    "Mark Lazenby",
    "Martin Soloman",
    "Neil Harrold",
    "Nia Dawson",
    "Nick Smith",
    "Paul Dutton",
    "Richard Arnot",
    "Rob Langley",
    "Robert Phillips",
    "Robert Thompson",
    "Sarah Smith",
    "Simon Watts",
    "Stephen Mackin",
    "Stephen McNicol",
    "Tim Care",
    "Toby Gibson",
]

claim_types = [
    "Fixed fee",
    "Cracked",
    "Re-trial",
    "Trial",
    "Guilty plea",
]


def main():
    all_claims = []
    for i in xrange(0, 500):
        all_claims.append({
            "advocate": get_advocate(),
            "number":   get_claim_number(),
            "date":     get_date(),
            "type":     get_type(),
            "value":    get_value()
        })

    all_claims.sort(key=lambda  x: x['date'])

    with open('../js/data.json', 'w') as fp:
        json.dump(all_claims, fp, sort_keys=True, indent=4, separators=(',', ': '))
        fp.close()


def get_date():
    return str(datetime.today() - timedelta(days=random.randint(3, 30)))

def get_type():
    return random.choice(claim_types)

def get_claim_number():
    return "C-" + str(random.randint(10000, 99999))

def get_advocate():
    return random.choice(advocates)


def get_value():
    if random.randint(0, 10) < 2:
        return random.uniform(20000, 70000)
    else:
        return random.uniform(500, 19000)


if __name__ == '__main__':
    main()
