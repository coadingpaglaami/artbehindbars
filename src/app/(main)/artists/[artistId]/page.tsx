import { ArtistProfile } from "@/webcomponents/protected";

interface ArtistInfoProps {
  params: Promise<{ artistId: string }>;
}

export default async function ArtistPage({ params }: ArtistInfoProps) {
  const { artistId } = await params;
  return <ArtistProfile artistId={artistId} />;
}
