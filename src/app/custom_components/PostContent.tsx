import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const PostContent = ({ Images }: { Images: string[] }) => {
  return (
    <>
      <Carousel className="mt-4">
        <CarouselContent>
          {Images.map((image, index) => {
            return (
              <CarouselItem key={index} className="w-[390px] h-[487px] object-cover ">
                <img src={image} alt="" />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
};
