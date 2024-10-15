drop schema if exists ccca cascade;

create schema ccca;

create table ccca.query (
	ride_id uuid,
	passenger_name text,
	driver_name text,
	fare numeric,
	distance numeric
);
