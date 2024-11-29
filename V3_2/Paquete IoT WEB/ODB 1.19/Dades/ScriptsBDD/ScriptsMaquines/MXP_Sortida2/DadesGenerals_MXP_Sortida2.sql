/****** Object:  Table [dbo].[Info_MXP_Sortida1_Alarmes]    Script Date: 2/13/2021 9:27:08 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_Sortides_Alarmes](
	[ID] [int] NOT NULL,
	[en] [varchar](255) NULL,
	[ca] [varchar](255) NULL,
	[fr] [varchar](255) NULL,
	[es] [varchar](255) NULL,
	[grup_en] [varchar](50) NULL,
	[grup_ca] [varchar](50) NULL,
	[grup_fr] [varchar](50) NULL,
	[grup_es] [varchar](50) NULL,
 CONSTRAINT [PK_Info_Sortides_Alarmes] PRIMARY KEY CLUSTERED
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Info_MXP_Sortida1_Info]    Script Date: 2/13/2021 9:26:59 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Info_Sortides_Info](
	[Id] [int] NOT NULL,
	[Ca] [varchar](max) NULL,
	[Es] [varchar](max) NULL,
	[En] [varchar](max) NULL,
 CONSTRAINT [PK_Info_Sortides_Info] PRIMARY KEY CLUSTERED
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	1	,N'	Waiting for order	',N'	Esperant Comanda	',N'	En attente de commande.	',N'	Esperando pedido.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	2	,N'	Pallet completed	',N'	Palet finalitzat	',N'		',N'	Palet finalizado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	3	,N'	Waiting for a pallet to leave the loading zone	',N'	Esperant sortida palet situat en zona de càrrega	',N'	Palette située dans la zone de chargement.	',N'	Esperando salida de palet situado en zona de carga	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	4	,N'	Photocell not sensing pallet in position	',N'	Fotocèl·lula no detecta palet posicionat	',N'		',N'	Fotocélula no detecta palet posicionado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	5	,N'	Inverter of the loading zone in fault	',N'	Error en variador de la zona de càrrega	',N'		',N'	Error en variador zona de carga	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	6	,N'	There is no pallet in position to palletize	',N'	No hi ha palet posicionat per paletitzar	',N'		',N'	No hay palet posicionado para paletizar	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	7	,N'	Incorrect element type in the robot file of orders	',N'	Tipus delement en ordre de robot incorrecte	',N'		',N'	Tipo de elemento en orden de robot incorrecta	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	8	,N'	Cannot palletize because of the presence of a pallet in transport in the loading zone	',N'	No es pot paletitzar perquè hi ha palet en transport en la zona de càrrega	',N'		',N'	No se puede paletizar porque hay palet en transporte en zona de carga	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	9	,N'		',N'		',N'		',N'		',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	10	,N'	No pallet in feeder 1	',N'	No hi ha palets a lalimentador 1.	',N'	Il ny a pas de palettes dans lalimentateur 1.	',N'	No hay palets en el alimentador 1.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	11	,N'	No pallet in feeder 2	',N'	No hi ha palets a lalimentador 2.	',N'	Il ny a pas de palettes dans lalimentateur 2.	',N'	No hay palets en el alimentador 2.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	12	,N'	No pallet in feeder 3	',N'	No hi ha palets a lalimentador 3.	',N'		',N'	No hay palets en el alimentador 3.	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	13	,N'	Order to pick a pallet from feeder prepared	',N'	Ordre dagafar palet de lalimentador preparada	',N'		',N'	rden coger palet alimentador preparada	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	14	,N'	Pallet format incorrect	',N'	Format de palet incorrecte	',N'		',N'	Formato de palet incorrecto	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	15	,N'	The feeder has another order to pick	',N'	Una altra estació té ordre danar a buscar palet a lalimentador	',N'		',N'	Otra estación tiene orden de ir a buscar palet a alimentador	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	16	,N'	Cannot take empty pallet. Waiting for a tall pallet to leave the zone	',N'	No es possible anar a deixar palet buit. Esperar sortida palet alt	',N'		',N'	No es posible ir a dejar palet vacío. Esperar salida palet alto	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	17	,N'	Pallet positioned	',N'	Palet posicionat	',N'		',N'	Palet posicionado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	18	,N'	Waiting for automatic entry of empty pallet	',N'	Esperant entrada automàtica de palet buit	',N'		',N'	Esperando entrada automàtica palet vacío	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	19	,N'	The requested pallet format doesnt exist	',N'	No existeix el format de palet seleccionat	',N'		',N'	No existe el formato de palet seleccionado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	20	,N'	The pallet doesnt has a BarCode	',N'	Palet sense BarCode	',N'		',N'	Palet sin BarCode	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	40	,N'	Waiting to finish group of boxes	',N'	Esperant caixes preparades per anar a buscar	',N'		',N'	Esperando cajas preparadas para ir a buscar	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	60	,N'	Interlayer feeder empty	',N'	Falten intercapes a lalimentador	',N'		',N'	Faltan intercapas en alimentador	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	61	,N'	The requested interlayer format doesnt exist	',N'	No existeix el format dintercapa seleccionat	',N'		',N'	No existe el formato de intercapa seleccionado	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	62	,N'	Order to pick an interlayer from feeder prepared	',N'	Ordre dagafar intercapa de lalimentador preparada	',N'		',N'	Orden coger intercapa alimentador preparada	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	70	,N'	Pallet is waiting for all boxes to be notified (BN message)	',N'	El palet està esperant a que shagin notificat totes les caixes (missatge BN)	',N'		',N'	El palet está esperando a que se hayan notificado todas las cajas (mensaje BN)	',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	75	,N'		',N'		',N'		',N'		',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Alarmes] ([ID], [en], [ca], [fr], [es], [grup_en], [grup_ca], [grup_fr], [grup_es]) VALUES (	100	,N'		',N'		',N'		',N'		',N'		',N'		',N'		',N'		')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (0, N'Desconegut', N'Desconocido', N'Unknown')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (1, N'Interromput per alarma', N'Interrumpido por alarma', N'Aborted by alarm')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (2, N'Falta potència', N'Falta potencia', N'Power off')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (3, N'Falta marxa', N'Falta marcha', N'Waiting start')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (4, N'Canvi de format', N'Cambio de formato', N'Format change')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (5, N'Falta comanda', N'Falta comanda', N'Missing order')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (6, N'Falta material', N'Falta material', N'Missing material')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (7, N'Restablint', N'Restableciendo', N'Reseting')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (8, N'Estoc davant', N'Stock delante', N'Stock ahead')
INSERT [dbo].[Info_Sortides_Info] ([Id], [Ca], [Es], [En]) VALUES (9, N'Construint palet', N'Construyendo pallet', N'Forming pallet')
GO
