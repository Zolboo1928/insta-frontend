import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const PostContent = ({ Images }: { Images: string[]|undefined }) => {
  return (
    <>
      <Carousel className="mt-4">
        <CarouselContent>
          {Images?.map((image, index) => {
            return (
              <CarouselItem key={index} className=" ">
                <img src={image} alt="" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
};
