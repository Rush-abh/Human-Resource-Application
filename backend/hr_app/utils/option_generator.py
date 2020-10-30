import pycountry


def get_countries():
    country_objects = list(pycountry.countries)
    countries = [(country.name, country.alpha_2) for country in country_objects]
    return countries


def get_states(country_code):
    state_objects = list(pycountry.subdivisions.get(country_code=country_code))
    states = [(state.name, state.code) for state in state_objects if state.type == "State" or state.type == "Zone"]
    return states
