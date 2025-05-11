interface SearchArticlePageProps {
  searchParams: Promise<{
    searchText: string;
  }>;
}

const SearchArticlePage = async ({ searchParams }: SearchArticlePageProps) => {
  const { searchText } = await searchParams;
  return (
    <section>
      <h1 className="text-2xl font-bold">Search Text is: {searchText}</h1>{" "}
    </section>
  );
};

export default SearchArticlePage;
