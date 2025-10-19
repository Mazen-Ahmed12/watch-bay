import React from 'react';
import Head from '../components/Head';
import Layout from './../Layout/Layout';

function AboutUs() {
  return (
    <Layout>
      <div className="container px-2 mx-auto my-6 min-height-screen">
        <Head title="About Us" />
        <div className="px-4 py-10 xl:py-20">
          <div className="flex flex-col gap-4 items-center xl:flex-row xl:gap-16">
            <div>
              <h3 className="mb-4 text-xl font-semibold lg:text-3xl">
                Welcome to our WatchBay
              </h3>
              <div className="mt-3 text-sm leading-8 text-text">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged.
                </p>
              </div>
              <div className="flex flex-col gap-6 mt-8 md:flex-row">
                <div className="p-8 w-full rounded-lg md:w-1/2 bg-dry">
                  <span className="block text-3xl font-extrabold">10K</span>
                  <h4 className="my-2 text-lg font-semibold">Listed Movies</h4>
                  <p className="mb-0 text-sm leading-7 text-text">
                    Lorem Ipsum is simply dummy text of the printing and
                  </p>
                </div>
                <div className="p-8 w-full rounded-lg md:w-1/2 bg-dry">
                  <span className="block text-3xl font-extrabold">8K</span>
                  <h4 className="my-2 text-lg font-semibold">Lovely Users</h4>
                  <p className="mb-0 text-sm leading-7 text-text">
                    Completely free, without registration! Lorem Ipsum is simply
                  </p>
                </div>
              </div>
            </div>
            <img
              src="https://picsum.photos/id/870/800/800"
              alt="aboutus"
              className="hidden object-fill w-full rounded-lg xl:w-auto xl:block h-header"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;
