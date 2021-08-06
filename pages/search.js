import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InfoCard from "../components/InfoCard";
const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, guests } = router.query;
  const formatedStartDate = format(new Date(startDate), "dd MMMM yy");
  const formatedEndDate = format(new Date(endDate), "dd MMMM yy");
  const range = `${formatedStartDate} - ${formatedEndDate}`;
  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${guests} guests`} />

      <main className="flex">
        <section className="pt-14 px-6">
          <p className="text-xs">
            300+ Stays - {range} - for {guests} Number of Guests
          </p>
          <h1 className="text-3xl font-semibold mt-2 mb-6">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Prices</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>

          {searchResults?.map((item) => {
            return (
              <InfoCard
                image={item.img}
                location={item.location}
                title={item.title}
                description={item.description}
                star={item.star}
                price={item.price}
                total={item.total}
                long={item.long}
                lat={item.lat}
              />
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps(context) {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );
  return {
    props: {
      searchResults,
    },
  };
}
